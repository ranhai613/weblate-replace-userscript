# weblate-replace-userscript

Weblateの翻訳作業を少し改善して、日本の翻訳者を助けるユーザースクリプトです。FTL: Multiverse Translation Projectでの使用を想定しています。

## Installation

1. ユーザースクリプトマネージャーを取得する。（例：greasemonkey、tampermonkey、violentmonkey）
2. [リンク](https://github.com/ranhai613/weblate-replace-userscript/raw/main/weblatereplace.user.js)をクリックしてスクリプトをインストールする。

## Usage
### ・Format
deeplの翻訳文は、テキストエリアにコピー＆ペーストする際、日本語の文章に適した形になるよう、特定の部分が自動的に置き換えられます。（例：""を「」に、...を……に）

### ・Person Replace
セリフ内の一人称、二人称を置き換えます。「」で囲まれた文章があり、始まりの　「　の前に特定の文字を入力することで動作します。（例：ぼき「私はあなたが好きだ。」　=>　「僕は君が好きだ。」）
#### 一人称の例
- わ : 私、私たち
- ぼ : 僕、僕たち
- お : 俺、俺たち
#### 二人称の例
- あ : あなた、あなた達
- き : 君、君たち
- お : お前、お前たち

その他の表現はスクリプト内を参照してください。
