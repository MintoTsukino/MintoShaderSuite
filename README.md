# MintoShaderSuite v0.3 (Stable)

RPGツクールMZ向けの軽量ポストエフェクトプラグイン。  
Bloom（ぼかし光）・Vignette（周辺減光）・Fog（霧層）の3要素を簡単に追加できます。  
PixiJS v5 環境に対応し、MECなしでも単独で動作します。

A lightweight post-processing filter for RPG Maker MZ.  
Adds Bloom, Vignette, and Fog layers with minimal setup.  
Works standalone, compatible with PixiJS v5.

---

## 特徴 / Features

- Bloom：柔らかい光のぼかし  
- Vignette：画面端の暗化（映画的トーン）  
- Fog：動く霧による奥行き演出  
- 軽量・依存なし・即導入可能  
- 画像1枚 (`relief_texture.png`) で動作
- **独自のテクスチャ画像に差し替えることで、霧や光の色味・濃度・質感を自由に調整可能**

  *(You can replace the texture image with your own to customize the color tone, density, and texture quality of the fog or lighting effects.)*
<img width="818" height="656" alt="スクリーンショット 2025-10-24 023310" src="https://github.com/user-attachments/assets/46dba3d6-c998-4fd6-8fd2-7097efaed716" />

---

## 導入方法 / Installation

1. `js/plugins/` に **MintoShaderSuite.js** をコピーします。  
2. プラグイン管理で有効化します。  
3. `img/pictures/` フォルダに `relief_texture.png` を配置します。  
   （無くても起動しますが、警告が表示されます）

---

## 使用上の注意 / Notes

- PixiJS v5（RPGツクールMZ標準環境）に対応しています。  
- MEC、MPOなど他のMintSoftプラグインが無くても単独で動作します。  
- 高負荷環境では BloomIntensity を下げると安定します。  
- “HD-2D” は SQUARE ENIX の登録商標であり、本プラグインは  
  それを模倣・再現するものではありません。演出上の参考表現です。

---

## ライセンス / License

© 2025 MintoSoft

自由に改変・再配布が可能ですが、クレジットを残してください。  
You are free to use, modify, and redistribute this plugin under the MIT license.  
Please retain the credit line in your works.


