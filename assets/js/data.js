/**
 * data.js — サイトに表示する「内容」をまとめたファイル
 *
 * 文章・写真・セリフを変えたいときは、基本的にこのファイルだけを編集すればOKです。
 * HTMLの組み立ては render.js、動きは interactions.js / gallery.js が担当しています。
 */

/** 写真フォルダの場所（index.html からの相対パス） */
export const IMAGE_DIR = 'assets/images/';

/* ------------------------------------------------------------
 * 猫のプロフィール
 * 年齢・体重・誕生日は推定値です。わからない情報は空文字 '' にすると表示されません。
 * ------------------------------------------------------------ */
export const cats = {
  bebe: {
    id: 'bebe',
    name: 'べべ',
    nameEn: 'BEBE',
    nameNote: 'フランス語の「bébé（赤ちゃん）」から',
    role: 'おっとり兄ちゃん',
    sex: '男の子',
    breed: 'ミックス',
    birthday: '2019年9月16日（推定）',
    age: '推定7歳（2026年時点）',
    weight: '約7kg（推定）',
    coat: '黒白のハチワレ',
    eyes: '黄緑色のやさしい目',
    charm: 'おでこの、少し斜めにずれたハチワレ模様',
    personality: ['おっとり', 'やさしい', '控えめ', '大きい'],
    intro:
      '大きな体に、やさしい心。ちょっと斜めのハチワレ模様がチャームポイントの、おっとり兄ちゃん。',
    photo: 'IMG_2219', // プロフィールに使う写真の id（下の photos を参照）
    story: {
      label: 'BEBE’S STORY',
      title: '家の前で出会った、小さな猫',
      photo: 'IMG_2218',
      paragraphs: [
        'もともとは野良猫。母猫とはぐれてしまった小さな猫を、実家の前で見つけたのがはじまりでした。',
        'それから家族の一員になって、いまでは体重約7kgの大きなお兄ちゃんです。',
        '後から家族になったももがとても元気なので、最近はちょっと押され気味。それでもやっぱり、おっとりやさしいお兄ちゃんです。',
      ],
    },
  },

  momo: {
    id: 'momo',
    name: 'もも',
    nameEn: 'MOMO',
    nameNote: '',
    role: 'ぐいぐい妹',
    sex: '女の子',
    breed: '',
    birthday: '2024年4月6日（推定）',
    age: '推定2歳（2026年時点）',
    weight: '約4kg（推定）',
    coat: 'つややかな真っ黒',
    eyes: '金色の大きな目',
    charm: '金色の目と、つやつやの毛並み',
    personality: ['活発', '甘えん坊', '積極的', '元気いっぱい'],
    intro:
      'つやつやの黒い毛と、金色の目。お母さんとなでなでが大好きな、元気いっぱいのおてんば娘。',
    photo: 'IMG_2229',
    story: {
      label: 'MOMO’S STORY',
      title: '獣医さんのところから来た、黒猫きょうだいのひとり',
      photo: 'IMG_2231',
      paragraphs: [
        '知り合いの獣医師さんに保護された黒猫きょうだい。そのうちのひとりを、家族として迎えました。',
        'そっくりなきょうだい猫はいまも獣医師さんのおうちで暮らしていて、しっぽ以外では見分けがつかないほど似ているそうです。',
        '女の子としては大きめの体に、元気と甘えたい気持ちをたっぷり詰め込んだおてんば娘です。',
      ],
    },
  },
};

/* ------------------------------------------------------------
 * 写真リスト
 *  - file    : assets/images/ 内のファイル名
 *  - cats    : 写っている猫（ギャラリーの絞り込みに使用）。2匹なら ['bebe','momo']
 *  - width / height : 画像のピクセルサイズ。表示前に枠を確保してレイアウトのズレを防ぎます
 *                     （確認：sips -g pixelWidth -g pixelHeight assets/images/*.jpg）
 *  - focus   : 丸や枠に切り抜いて表示するときの中心位置（CSS の object-position）
 *  - darkFur : true にすると、黒い毛がつぶれないよう表示時だけ少し明るくします（元画像は変更しません）
 * ------------------------------------------------------------ */
export const photos = [
  {
    id: 'IMG_2232',
    file: 'IMG_2232.jpg',
    cats: ['bebe', 'momo'],
    width: 1600,
    height: 1200,
    focus: '30% 60%',
    darkFur: false, // 窓からの逆光で背景が明るいので補正なし
    alt: 'リビングの写真。手前のソファのひじかけにあごをのせた黒猫のもも、奥のソファでハチワレのべべが横になっている',
    caption: '手前にもも、奥のソファにはべべ。いつものリビング。',
  },
  {
    id: 'IMG_2231',
    file: 'IMG_2231.jpg',
    cats: ['bebe', 'momo'],
    width: 1600,
    height: 1200,
    focus: '24% 62%', // OUR STORY では左側のももを中心に切り抜く
    darkFur: false,
    alt: '同じリビングを少し違う角度から。手前に金色の目のもも、奥のソファにべべ',
    caption: '同じリビングで、もう一枚。奥のべべはソファでごろん。',
  },
  {
    id: 'IMG_2229',
    file: 'IMG_2229.jpg',
    cats: ['momo'],
    width: 1200,
    height: 1600,
    focus: '50% 34%',
    darkFur: true,
    alt: 'ソファのひじかけで香箱座りをする黒猫のもも。金色の目がはっきり見える',
    caption: 'ソファのひじかけで、金色の目がきらり。',
  },
  {
    id: 'IMG_2219',
    file: 'IMG_2219.jpg',
    cats: ['bebe'],
    width: 1200,
    height: 1600,
    focus: '50% 40%',
    darkFur: false,
    alt: '正面を向いたハチワレ猫のべべ。おでこに斜めの白いすじ模様があり、目は黄緑色',
    caption: '正面からのべべ。おでこの斜めのハチワレがチャームポイント。',
  },
  {
    id: 'IMG_2220',
    file: 'IMG_2220.jpg',
    cats: ['bebe'],
    width: 1200,
    height: 1600,
    focus: '50% 62%',
    darkFur: false,
    alt: 'べべの顔のクローズアップ。黄緑色の目とおでこの白いすじ模様',
    caption: 'べべのお顔をアップで。黄緑色の目がやさしい。',
  },
  {
    id: 'IMG_2218',
    file: 'IMG_2218.jpg',
    cats: ['bebe'],
    width: 1200,
    height: 1600,
    focus: '55% 50%',
    darkFur: true,
    alt: '少し横を向いたハチワレ猫のべべ',
    caption: 'ちょっと横を向いたべべ。おっとりした雰囲気。',
  },
];

/* ------------------------------------------------------------
 * 子猫のころ（LITTLE DAYS）
 * 送ってもらった子猫時代の写真。書き方は上の photos と同じです。
 * 当時の写真を撮り直したものも多いので、写り込みは補正していません。
 * ------------------------------------------------------------ */
/** 子猫のころの記録（見出しの下に小さく表示。なければ '' ） */
export const kittenNotes = {
  bebe: '',
  momo: '2024年5月21日の体重は、450g。',
};

export const kittenPhotos = {
  bebe: [
    {
      id: 'IMG_2363',
      file: 'IMG_2363.jpg',
      cats: ['bebe'],
      width: 720,
      height: 1280,
      focus: '45% 48%',
      darkFur: false,
      alt: '草むらの中にいる、小さな黒白の子猫のべべ',
      caption: '草むらの中から、こちらをじっと。',
    },
    {
      id: 'IMG_2358',
      file: 'IMG_2358.jpg',
      cats: ['bebe'],
      width: 1200,
      height: 1600,
      focus: '50% 45%',
      darkFur: false,
      alt: '人の腕にだっこされた子猫のべべ。白いおなかと肉球が見えている',
      caption: 'だっこで、白いおなかをまる見せ。',
    },
    {
      id: 'IMG_2372',
      file: 'IMG_2372.jpg',
      cats: ['bebe'],
      width: 1200,
      height: 1600,
      focus: '45% 50%',
      darkFur: false,
      alt: '人の手に抱えられた子猫のべべ。おでこに白いすじ模様がある',
      caption: 'このころから、おでこのハチワレ。',
    },
    {
      id: 'IMG_2371',
      file: 'IMG_2371.jpg',
      cats: ['bebe'],
      width: 1200,
      height: 1600,
      focus: '45% 55%',
      darkFur: false,
      alt: '水色の毛布の上で、目を閉じて眠る子猫のべべ',
      caption: '水色の毛布で、すやすや。',
    },
    {
      id: 'IMG_2370',
      file: 'IMG_2370.jpg',
      cats: ['bebe'],
      width: 1200,
      height: 1600,
      focus: '45% 50%',
      darkFur: false,
      alt: '赤いチェック柄の布の上で、上を向いて眠る子猫のべべ',
      caption: '赤いチェックの上で、ぐっすり。',
    },
    {
      id: 'IMG_2369',
      file: 'IMG_2369.jpg',
      cats: ['bebe'],
      width: 1200,
      height: 1600,
      focus: '50% 45%',
      darkFur: false,
      alt: '目を閉じた子猫のべべの顔のアップ',
      caption: 'おやすみ中のお顔をアップで。',
    },
    {
      id: 'IMG_2392',
      file: 'IMG_2392.jpg',
      cats: ['bebe'],
      width: 900,
      height: 1600,
      focus: '45% 55%',
      darkFur: false,
      alt: '窓辺で、プランターの猫草を食べる子猫のべべ',
      caption: '猫草を、もぐもぐ。',
    },
    {
      id: 'IMG_2393',
      file: 'IMG_2393.jpg',
      cats: ['bebe'],
      width: 905,
      height: 1600,
      focus: '50% 52%',
      darkFur: false,
      alt: '窓辺の白い植木鉢の横から、こちらを見る子猫のべべ',
      caption: '植木鉢のとなりで、ちらり。',
    },
    {
      id: 'IMG_2395',
      file: 'IMG_2395.jpg',
      cats: ['bebe'],
      width: 905,
      height: 1600,
      focus: '50% 45%',
      darkFur: false,
      alt: '窓辺で低い姿勢になり、こちらを見つめる子猫のべべ',
      caption: '低い姿勢で、そろりそろり。',
    },
    {
      id: 'IMG_2396',
      file: 'IMG_2396.jpg',
      cats: ['bebe'],
      width: 905,
      height: 1600,
      focus: '50% 40%',
      darkFur: false,
      alt: '窓辺の細い通路を、こちらへ歩いてくる子猫のべべ',
      caption: '窓辺を、てくてく。',
    },
    {
      id: 'IMG_2394',
      file: 'IMG_2394.jpg',
      cats: ['bebe'],
      width: 905,
      height: 1600,
      focus: '55% 55%',
      darkFur: false,
      alt: '重ねた段ボール箱の穴から顔を出す子猫のべべ',
      caption: '段ボールの窓から、ひょっこり。',
    },
  ],
  momo: [
    {
      id: 'IMG_2366',
      file: 'IMG_2366.jpg',
      cats: ['momo'],
      width: 1108,
      height: 1477,
      focus: '50% 40%',
      darkFur: true,
      alt: 'ストライプの布の上で、あおむけで眠る黒い子猫のもも。ピンクの首輪に鈴がついている',
      caption: 'ピンクの首輪で、ばんざい寝。',
    },
    {
      id: 'IMG_2367',
      file: 'IMG_2367.jpg',
      cats: ['momo'],
      width: 1108,
      height: 1477,
      focus: '50% 50%',
      darkFur: true,
      alt: 'ストライプの布の上で、丸くなって眠る黒い子猫のもも',
      caption: 'ストライプにくるまって、すやすや。',
    },
    {
      id: 'IMG_2368',
      file: 'IMG_2368.jpg',
      cats: ['momo'],
      width: 1200,
      height: 1600,
      focus: '50% 45%',
      darkFur: true,
      alt: '白いふわふわの毛布に顔をうずめる黒い子猫のもも',
      caption: 'ふわふわの毛布に、顔をうずめて。',
    },
  ],
};

/**
 * 写真アルバムに並べる写真：いまの写真 → 子猫のころの写真 の順。
 * 子猫の写真には kitten: true を付けて、「子猫のころ」の絞り込みに使います。
 * photos や kittenPhotos に足した写真は、自動でアルバムにも並びます。
 */
export const albumPhotos = [
  ...photos,
  ...[...kittenPhotos.bebe, ...kittenPhotos.momo].map((photo) => ({ ...photo, kitten: true })),
];

/**
 * 子猫のころの動画（音声は消してあります）
 *  - file   : assets/videos/ 内の動画ファイル
 *  - poster : 再生前に表示する画像
 */
export const VIDEO_DIR = 'assets/videos/';

export const kittenVideos = {
  bebe: [
    {
      file: 'bebe-kitten-1.mp4',
      poster: 'bebe-kitten-1.jpg',
      width: 720,
      height: 1280,
      label: '子猫のべべが、台の上で頭をなでてもらう動画（28秒・音声なし）',
      caption: 'やさしく、なでてもらって。（28秒）',
    },
    {
      file: 'bebe-kitten-2.mp4',
      poster: 'bebe-kitten-2.jpg',
      width: 720,
      height: 1280,
      label: '子猫のべべが、床の上を歩いたり遊んだりする動画（1分44秒・音声なし）',
      caption: 'フローリングを、てくてく。（1分44秒）',
    },
  ],
  momo: [
    {
      file: 'momo-kitten-1.mp4',
      poster: 'momo-kitten-1.jpg',
      width: 720,
      height: 1280,
      label: '子猫のもも、毛布の上でうとうとする動画（15秒・音声なし）',
      caption: '毛布の上で、うとうと。（15秒）',
    },
    {
      file: 'momo-kitten-2.mp4',
      poster: 'momo-kitten-2.jpg',
      width: 720,
      height: 1280,
      label: '子猫のもも、毛布の上で横になる動画（32秒・音声なし）',
      caption: 'ふわふわ毛布で、ごろん。（32秒）',
    },
  ],
};

/** ヒーローで使う写真（メイン1枚＋丸い小窓2枚） */
export const heroPhotos = {
  main: 'IMG_2232',
  bebe: 'IMG_2220',
  momo: 'IMG_2229',
};

/* ------------------------------------------------------------
 * DAILY LIFE のエピソードカード
 *  scene : カードの上部に描く小さなイラストの種類（render.js の SCENES 参照）
 * ------------------------------------------------------------ */
export const episodes = [
  {
    number: '01',
    label: 'GUIGUI',
    title: '元気すぎる妹',
    text: ['ももはべべにも遠慮なくぐいぐい。', 'やさしいべべは、ちょっとタジタジ。'],
    scene: 'push',
  },
  {
    number: '02',
    label: 'LAP SEAT',
    title: 'お母さんのおひざ',
    text: ['ももにとって、お母さんの膝の上は特等席。', '気づけばすぐに甘えにいきます。'],
    scene: 'lap',
  },
  {
    number: '03',
    label: 'ME TOO!',
    title: 'わたしも撫でて！',
    text: ['べべを撫でていると、ももが走ってくる。', '「わたしも！」という声が聞こえてきそう。'],
    scene: 'metoo',
  },
];

/* ------------------------------------------------------------
 * ボタンを押したときのセリフ
 * ------------------------------------------------------------ */
export const messages = {
  // 「べべをなでる」を押したときのべべ
  bebePet: ['ごろごろ…', 'ふにゃあ…', 'もうちょっとだけ…'],
  // 続けてなですぎたときのべべ（ときどき噛みます）
  bebeBite: ['がぶっ！ …なですぎ。', 'かぷっ。もうおしまい。'],
  // べべを撫でた少しあとに登場するもも
  momoMeToo: 'わたしも！',
  // 「ももを呼ぶ」を押したとき
  momoCall: ['きたよ！', 'なでて！', 'おひざ空いてる？', 'べべだけずるい！', 'よんだ？'],
  // 肉球ボタン
  paw: [
    'ぷにっ。',
    'きょうもいい日になりますように。',
    'べべは今日もおっとり。',
    'ももは今日もぐいぐい。',
    'ゆっくりしていってね。',
    'なでなでは、ほどほどに。',
  ],
};
