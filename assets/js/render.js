/**
 * render.js — data.js の内容から HTML を組み立てて、ページに差し込むファイル
 *
 * 方針：テンプレートリテラル（`...${}...`）で HTML の文字列を作り、innerHTML で入れる。
 * data.js の文字列は escapeHTML() を通してから埋め込むので、< や & が入っていても安全です。
 */
import { IMAGE_DIR, cats, photos, heroPhotos, episodes } from './data.js';

/** HTML として特別な意味を持つ文字を、ただの文字に変換する */
function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** id から写真データを探す */
export function getPhoto(id) {
  const photo = photos.find((p) => p.id === id);
  if (!photo) console.warn(`[data.js] 写真 "${id}" が photos に見つかりません`);
  return photo;
}

/** SVG アイコン（index.html 内の <symbol>）を呼び出す */
function icon(name, className = 'icon') {
  return `<svg class="${className}" aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
}

/**
 * <img> タグを作る
 * @param {object} photo    photos の1件
 * @param {object} options  { eager: 先に読み込むか, className, decorative: 装飾用で alt を空にするか }
 */
function imgTag(photo, { eager = false, className = '', decorative = false } = {}) {
  if (!photo) return '';
  const classes = ['photo__img', className, photo.darkFur ? 'is-dark-fur' : ''].filter(Boolean).join(' ');
  return `<img
    class="${classes}"
    src="${IMAGE_DIR}${escapeHTML(photo.file)}"
    alt="${decorative ? '' : escapeHTML(photo.alt)}"
    width="${photo.width}" height="${photo.height}"
    style="--focus: ${escapeHTML(photo.focus)}"
    data-file="${escapeHTML(photo.file)}"
    ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}
    decoding="async">`;
}

/* ------------------------------------------------------------
 * HERO
 * ------------------------------------------------------------ */
function renderHero(root) {
  const main = getPhoto(heroPhotos.main);
  const bebe = getPhoto(heroPhotos.bebe);
  const momo = getPhoto(heroPhotos.momo);

  root.innerHTML = `
    <figure class="hero__main photo">
      ${imgTag(main, { eager: true })}
    </figure>
    <div class="hero__badge hero__badge--bebe">
      <span class="photo photo--round">${imgTag(bebe, { eager: true, decorative: true })}</span>
      <span class="hero__badge-label">BEBE</span>
    </div>
    <div class="hero__badge hero__badge--momo">
      <span class="photo photo--round">${imgTag(momo, { eager: true, decorative: true })}</span>
      <span class="hero__badge-label">MOMO</span>
    </div>
  `;
}

/* ------------------------------------------------------------
 * MEET THE CATS（プロフィールカード）
 * ------------------------------------------------------------ */

/** 猫ごとに違う「ボタン＋吹き出し」部分 */
function profileAction(cat) {
  if (cat.id === 'bebe') {
    return `
      <div class="interact" data-interact="bebe">
        <button type="button" class="btn btn--bebe" data-action="pet-bebe">
          ${icon('heart')}<span>べべをなでる</span>
        </button>
        <div class="interact__stage">
          <div class="fx-layer" data-fx aria-hidden="true"></div>
          <p class="bubble bubble--bebe" data-bubble aria-live="polite"></p>
          <div class="cameo" data-cameo aria-live="polite">
            ${icon('momo', 'cameo__icon')}
            <p class="bubble bubble--momo bubble--cameo" data-cameo-text></p>
          </div>
        </div>
      </div>`;
  }
  return `
    <div class="interact" data-interact="momo">
      <button type="button" class="btn btn--momo" data-action="call-momo">
        ${icon('paw')}<span>ももを呼ぶ</span>
      </button>
      <div class="interact__stage">
        <p class="bubble bubble--momo" data-bubble aria-live="polite"></p>
      </div>
    </div>`;
}

function profileCard(cat) {
  const photo = getPhoto(cat.photo);
  const facts = [
    ['性別', cat.sex],
    ['年齢', cat.age],
    ['体重', cat.weight],
    ['毛色', cat.coat],
    ['目', cat.eyes],
    ['チャームポイント', cat.charm],
  ];

  return `
    <article class="profile profile--${cat.id} reveal" aria-labelledby="profile-${cat.id}-name">
      <div class="profile__photo photo">
        ${imgTag(photo)}
        <span class="profile__icon">${icon(cat.id)}</span>
      </div>
      <div class="profile__body">
        <p class="profile__role">${escapeHTML(cat.role)}</p>
        <h3 class="profile__name" id="profile-${cat.id}-name">
          ${escapeHTML(cat.name)}
          <span class="profile__en" lang="en">${escapeHTML(cat.nameEn)}</span>
        </h3>
        ${cat.nameNote ? `<p class="profile__note">名前の由来：${escapeHTML(cat.nameNote)}</p>` : ''}
        <p class="profile__intro">${escapeHTML(cat.intro)}</p>

        <dl class="facts">
          ${facts
            .map(([label, value]) => `<div class="facts__row"><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>`)
            .join('')}
        </dl>

        <p class="visually-hidden">性格：</p>
        <ul class="tags">
          ${cat.personality.map((word) => `<li>${escapeHTML(word)}</li>`).join('')}
        </ul>

        ${profileAction(cat)}
      </div>
    </article>`;
}

function renderProfiles(root) {
  root.innerHTML = [cats.bebe, cats.momo].map(profileCard).join('');
}

/* ------------------------------------------------------------
 * OUR STORY
 * ------------------------------------------------------------ */
function storyBlock(cat) {
  const { story } = cat;
  return `
    <article class="story story--${cat.id} reveal" aria-labelledby="story-${cat.id}-title">
      <div class="story__photo photo">${imgTag(getPhoto(story.photo))}</div>
      <div class="story__body">
        <p class="eyebrow">${escapeHTML(story.label)}</p>
        <h3 class="story__title" id="story-${cat.id}-title">${escapeHTML(story.title)}</h3>
        ${story.paragraphs.map((p) => `<p>${escapeHTML(p)}</p>`).join('')}
      </div>
    </article>`;
}

function renderStories(root) {
  root.innerHTML = [cats.bebe, cats.momo].map(storyBlock).join('');
}

/* ------------------------------------------------------------
 * DAILY LIFE（エピソードカード）
 * 各カード上部の小さなイラスト。アイコンを並べて CSS で動かしています。
 * ------------------------------------------------------------ */
const SCENES = {
  // ももがべべにぐいぐい
  push: `
    <span class="scene__cat scene__cat--bebe">${icon('bebe')}<span class="sweat"></span></span>
    <span class="scene__cat scene__cat--momo">${icon('momo')}</span>`,
  // お母さんのおひざにもも
  lap: `
    <span class="scene__lap"></span>
    <span class="scene__cat scene__cat--momo">${icon('momo')}</span>
    <span class="scene__heart">${icon('heart')}</span>`,
  // べべを撫でていると、ももが走ってくる
  metoo: `
    <span class="scene__cat scene__cat--bebe">${icon('bebe')}<span class="scene__heart scene__heart--small">${icon('heart')}</span></span>
    <span class="scene__cat scene__cat--momo">${icon('momo')}<span class="scene__say">わたしも！</span></span>`,
};

function episodeCard(ep) {
  return `
    <li class="episode episode--${ep.scene} reveal">
      <div class="scene scene--${ep.scene}" aria-hidden="true">${SCENES[ep.scene] ?? ''}</div>
      <p class="episode__label"><span class="episode__num">${escapeHTML(ep.number)}</span> ${escapeHTML(ep.label)}</p>
      <h3 class="episode__title">${escapeHTML(ep.title)}</h3>
      <p class="episode__text">${ep.text.map(escapeHTML).join('<br>')}</p>
    </li>`;
}

function renderEpisodes(root) {
  root.innerHTML = episodes.map(episodeCard).join('');
}

/* ------------------------------------------------------------
 * PHOTO GALLERY
 * ------------------------------------------------------------ */
function galleryItem(photo, index) {
  return `
    <li class="gallery__item reveal" data-cats="${photo.cats.join(' ')}">
      <figure>
        <button type="button" class="gallery__button" data-index="${index}"
                aria-label="写真を拡大：${escapeHTML(photo.alt)}">
          <span class="photo">${imgTag(photo)}</span>
        </button>
        <figcaption class="gallery__caption">${escapeHTML(photo.caption)}</figcaption>
      </figure>
    </li>`;
}

function renderGallery(root) {
  root.innerHTML = photos.map(galleryItem).join('');
}

/** ページ全体を描画する（main.js から呼ばれる） */
export function renderAll() {
  const targets = [
    ['[data-hero]', renderHero],
    ['[data-profiles]', renderProfiles],
    ['[data-stories]', renderStories],
    ['[data-episodes]', renderEpisodes],
    ['[data-gallery]', renderGallery],
  ];
  for (const [selector, render] of targets) {
    const root = document.querySelector(selector);
    if (root) render(root);
  }
}
