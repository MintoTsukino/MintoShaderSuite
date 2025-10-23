/*:
 * @target MZ
 * @plugindesc 🎥 MintoShaderSuite v0.3 (Pixi5 Safe) — Bloom風＋Vignette＋Fog＋Tone 修正版
 * @author MintoSoft
 *
 * @param bloomIntensity
 * @text Bloom風ぼかし強度
 * @type number
 * @min 0
 * @max 2
 * @decimals 2
 * @default 0.6
 *
 * @param vignetteDarkness
 * @text 周囲暗さ（Vignette）
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.2
 *
 * @param fogDensity
 * @text 霧の濃さ
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.25
 *
 * @param fogSpeed
 * @text 霧の流れ速度
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.015
 *
 * @param toneR
 * @text カラートーンR
 * @type number
 * @default 0
 *
 * @param toneG
 * @text カラートーンG
 * @type number
 * @default 0
 *
 * @param toneB
 * @text カラートーンB
 * @type number
 * @default 0
 *
 * @help
 * ------------------------------------------------------------
 *  PixiJS 5.x 完全対応
 * - 高級感ある発光・ぼかし（ColorMatrix + Blur）
 * - 周囲を自然に暗くするVignette風トーン
 * - ゆらぐ霧レイヤー（img/pictures/relief_texture.png）
 * - カラートーン補正（映画調色味）
 *
 * ※霧画像は "img/pictures/relief_texture.png" を使用します。
 * ------------------------------------------------------------
 */

(() => {
  const P = PluginManager.parameters("MintoShaderSuite");
  const bloomIntensity = Number(P.bloomIntensity || 0.6);
  const vignetteDarkness = Number(P.vignetteDarkness || 0.2);
  const fogDensity = Number(P.fogDensity || 0.25);
  const fogSpeed = Number(P.fogSpeed || 0.015);
  const toneR = Number(P.toneR || 0);
  const toneG = Number(P.toneG || 0);
  const toneB = Number(P.toneB || 0);

  // === フィルター定義 ===
  var filters = {};

  // Bloom風（ColorMatrix + Blur）
  filters.bloom = new PIXI.filters.ColorMatrixFilter();
  filters.bloom.brightness(1.3 + bloomIntensity * 0.4, false);
  filters.bloom.contrast(1.2, false);
  filters.blur = new PIXI.filters.BlurFilter();
  filters.blur.blur = bloomIntensity * 0.5;

  // Vignette風（画面全体を少し暗く）
  filters.vignette = new PIXI.filters.ColorMatrixFilter();
  filters.vignette.brightness(1.0 - vignetteDarkness, false);

  // === Scene_Map拡張 ===
  var _Scene_Map_start = _Scene_Map_start || Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);

    const cont = this._spriteset._baseSprite;
    cont.filters = [filters.blur, filters.bloom, filters.vignette];

    // FogBitmapをここで定義
    const fogBitmap = ImageManager.loadPicture("relief_texture");

    // Fogスプライトを作成
    this._fogLayer = new TilingSprite(fogBitmap);
    this._fogLayer.opacity = fogDensity * 255;
    this._fogLayer.blendMode = PIXI.BLEND_MODES.SCREEN;
    this._fogLayer.scale.set(2, 2);
    this._fogLayer.move(0, 0, Graphics.width, Graphics.height);

    // spriteset に追加
    this._spriteset.addChild(this._fogLayer);
  };

  var _Scene_Map_update = _Scene_Map_update || Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    // Fog移動アニメ
    if (this._fogLayer) {
      this._fogLayer.origin.x += fogSpeed * 60;
      this._fogLayer.origin.y += fogSpeed * 30;
    }

    // カラートーン補正
    $gameScreen.startTint([toneR, toneG, toneB, 0], 0);
  };

  console.log("%c🎬 MintoShaderSuite v0.3 (Pixi5 Safe) loaded successfully", "color:#9df");
})();
