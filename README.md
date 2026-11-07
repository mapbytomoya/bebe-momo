# BEBE & MOMO 🐾

> おっとり兄ちゃんと、ぐいぐい妹。
> ふたりと家族の、なんでもない幸せな毎日。

実家で暮らす2匹の保護猫、ハチワレの **べべ** と黒猫の **もも** を紹介する、1ページ完結の小さなデジタル写真集です。

## 使用技術

- HTML5 / CSS3 / Vanilla JavaScript（ES Modules）
- ビルドツール・npmパッケージは使っていません
- フォント：Google Fonts（Zen Maru Gothic / Quicksand）。読み込めない場合はヒラギノ丸ゴなどで表示されます
- 公開先：GitHub Pages を想定

## ファイル構成

```
bebe-momo/
├── index.html              ページの骨組み（見出し・セクション・SVGアイコン）
├── assets/
│   ├── css/
│   │   └── style.css       見た目（色・レイアウト・アニメーション）
│   ├── js/
│   │   ├── data.js         ★ 内容：プロフィール・写真・エピソード・セリフ
│   │   ├── main.js         入り口：下の3つを順番に呼び出す
│   │   ├── render.js       data.js から HTML を組み立てる
│   │   ├── interactions.js 「べべをなでる」「ももを呼ぶ」「肉球」
│   │   └── gallery.js      写真の絞り込みと拡大表示
│   ├── images/
│   │   ├── IMG_xxxx.jpg    猫の写真（自分で追加）
│   │   └── placeholder.svg 写真が見つからないときの代わり画像
│   ├── videos/
│   │   └── *-kitten-*.mp4 / .jpg  子猫のころの動画（音声なし）と再生前の画像
│   └── icons/
│       └── favicon.svg     ブラウザのタブに出るべべの顔
├── tools/
│   └── drop_audio.py       動画から音声を消すスクリプト
└── README.md
```

**文章や写真を変えたいときは、まず `data.js` を開いてください。** ほとんどの変更はこのファイルだけで済みます。

## ローカルで表示する

ES Modules を使っているため、`index.html` をダブルクリックで開くと JavaScript が動きません。
簡易サーバーを立ち上げて開いてください（Mac には Python が入っています）。

```bash
cd bebe-momo
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 を開きます。終了するときはターミナルで `Ctrl + C`。

VS Code を使っている場合は、拡張機能「Live Server」でもOKです。

## 写真を追加・差し替える

### 1. いま使っている6枚

元の写真（HEIC）は `originals/` に保管し、公開用に変換したJPEGを `assets/images/` に置いています。
`originals/` は `.gitignore` で除外しているので、GitHub には上がりません。

| ファイル名 | 内容 | 主な使い道 |
|---|---|---|
| IMG_2232.jpg | 手前にもも、奥のソファにべべ | HEROのメイン写真 |
| IMG_2231.jpg | 同じリビング・別の構図（2匹） | もものストーリー（ももを中心に切り抜き） |
| IMG_2229.jpg | ソファのひじかけにいるもも | ももプロフィール / HERO の丸窓 |
| IMG_2219.jpg | 正面を向いたべべ | べべプロフィール |
| IMG_2220.jpg | べべの顔のアップ | HERO の丸窓 |
| IMG_2218.jpg | 少し横を向いたべべ | べべのストーリー |

※ ギャラリーにはすべての写真が並びます。
写真ファイルが見つからない場所には、置くべきファイル名がグレーのラベルで表示されます。

### 子猫のころ（LITTLE DAYS）

`data.js` の `kittenPhotos`（写真）と `kittenVideos`（動画）に、猫ごとに並べています。
写真の書き方は `photos` と同じです。写真を押すと拡大表示になり、その猫の子猫写真だけで前後に移動します。
ここの写真は下の写真アルバムにも自動で並び、「子猫のころ」ボタンで絞り込めます。

### 動画を追加する（音声を消す）

動画は家族の声などが入らないよう、音声を消して載せています。画質はそのまま、位置情報などのメタデータも消えます。

```bash
python3 -I tools/drop_audio.py originals/元の動画.MP4 /tmp/noaudio.mp4
avconvert -s /tmp/noaudio.mp4 -p PresetPassthrough -o assets/videos/momo-kitten-3.mp4
```

再生前に表示する画像は QuickLook で作れます。

```bash
qlmanage -t -s 720 -o /tmp assets/videos/momo-kitten-3.mp4
sips -s format jpeg /tmp/momo-kitten-3.mp4.png --out assets/videos/momo-kitten-3.jpg
```

### 2. 新しい写真を変換する（位置情報も消える方法）

iPhoneの写真（HEIC・数MB）は、そのままだとブラウザで表示できなかったり重かったりします。
また、**撮影場所の位置情報（GPS）が記録されています**。
`sips` だけで変換すると位置情報が残るので、次の手順を使ってください（macOSに最初から入っているコマンドだけで動きます）。

```bash
# 1. 元写真を originals/ に入れる（Finderでドラッグでも可）

# 2. QuickLookで長辺1600pxのPNGを作る（向きが正しくなり、位置情報などのメタデータが消える）
mkdir -p /tmp/bebe-momo-ql
qlmanage -t -s 1600 -o /tmp/bebe-momo-ql originals/IMG_2300.HEIC

# 3. JPEGにして assets/images/ に保存
sips -s format jpeg -s formatOptions 82 /tmp/bebe-momo-ql/IMG_2300.HEIC.png --out assets/images/IMG_2300.jpg
```

位置情報が消えたかの確認（`(null)` と出ればOK）：

```bash
mdimport assets/images/IMG_2300.jpg; mdls -name kMDItemLatitude assets/images/IMG_2300.jpg
```

### 3. 写真のサイズを data.js に書く

ページの読み込み中にレイアウトがガタつかないよう、`data.js` の `photos` に縦横のピクセル数を書いています。

```bash
sips -g pixelWidth -g pixelHeight assets/images/*.jpg
```

で確認して、各写真の `width` / `height` に書いてください。

### 4. 新しい写真を増やす

`data.js` の `photos` 配列に1件追加するだけで、ギャラリーに並びます。

```js
{
  id: 'IMG_2300',
  file: 'IMG_2300.jpg',
  cats: ['momo'],          // べべなら ['bebe']、2匹なら ['bebe', 'momo']
  width: 1200,
  height: 1600,
  focus: '50% 50%',        // 丸や枠で切り抜くときの中心位置
  darkFur: true,           // 黒猫が写っていて暗く見えるときは true
  alt: '写真の内容を説明する文（目が見えない人の読み上げ用）',
  caption: '写真の下に出る短いキャプション',
},
```

### 黒猫（もも）の写真が暗いとき

`darkFur: true` の写真には、表示するときだけ少し明るくする補正がかかります（元の画像ファイルは変更しません）。
強さは `style.css` の先頭にある `--dark-fur-filter` で調整できます。

## プロフィールや文章を変える

- **プロフィール・家族になった経緯**：`data.js` の `cats`
- **日常エピソードの3枚のカード**：`data.js` の `episodes`
- **吹き出しのセリフ**：`data.js` の `messages`
- **HERO のキャッチコピーやセクション見出し**：`index.html`
- **色・フォント**：`style.css` の先頭 `:root { ... }`

## 更新を公開するときの注意

GitHub Pages では、ブラウザがファイルを10分ほど保存します。そのため、更新直後に古いファイルと新しいファイルが混ざって表示されることがあります。
これを防ぐため、`index.html` では CSS と JS の後ろに `?v=20261107` のような日付を付けています。
**CSS や JS を変えたときは、`index.html` の中の日付をすべて新しい日付に置き換えてから** push してください（写真や data.js の文章だけの変更でも、data.js を変えたら同じです）。

## GitHub Pages で公開する

1. GitHub で新しいリポジトリ（例：`bebe-momo`）を作る
2. このフォルダで次を実行

   ```bash
   git init
   git add .
   git commit -m "BEBE & MOMO サイトを作成"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/bebe-momo.git
   git push -u origin main
   ```

   `originals/`（元写真）は `.gitignore` で除外済みなので、アップロードされません。

3. GitHub のリポジトリ画面 → **Settings → Pages**
4. 「Build and deployment」の Source を **Deploy from a branch**、Branch を **main / (root)** にして Save
5. 数分後に `https://<ユーザー名>.github.io/bebe-momo/` で公開されます

パスはすべて相対パスなので、`/bebe-momo/` のようなサブパスでもそのまま動きます。

公開後、`index.html` の `og:image` を絶対URL（例：`https://<ユーザー名>.github.io/bebe-momo/assets/images/IMG_2232.jpg`）に書き換えると、SNSでシェアしたときに写真が表示されます。
