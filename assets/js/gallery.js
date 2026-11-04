/**
 * gallery.js — 写真アルバムの絞り込みと、拡大表示（ライトボックス）
 *
 * 拡大表示にはブラウザ標準の <dialog> 要素を使っています。
 * 「子猫のころ」の写真も、同じ拡大表示を使います（猫ごとの写真だけで前後に移動）。
 *   - showModal() で開くと、背景が操作できなくなり、フォーカスがダイアログ内に閉じ込められる
 *   - Escape キーで閉じる動作も標準で付いている
 */
import { IMAGE_DIR, photos, kittenPhotos } from './data.js';

const FILTER_LABELS = { all: 'すべて', bebe: 'べべ', momo: 'もも', both: 'ふたり' };

/** 写真がフィルターに当てはまるか */
function matchesFilter(photo, filter) {
  if (filter === 'all') return true;
  if (filter === 'both') return photo.cats.length >= 2;
  return photo.cats.includes(filter);
}

export function setupGallery() {
  const list = document.querySelector('[data-gallery]');
  const dialog = document.querySelector('[data-lightbox]');
  if (!list || !dialog) return;

  const status = document.querySelector('[data-gallery-status]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const items = [...list.querySelectorAll('.gallery__item')];

  const img = dialog.querySelector('[data-lightbox-img]');
  const caption = dialog.querySelector('[data-lightbox-caption]');
  const count = dialog.querySelector('[data-lightbox-count]');

  let currentFilter = 'all';
  let visibleIndexes = photos.map((_, i) => i); // 今表示されている写真の番号一覧
  let currentSet = []; // 拡大表示で前後に移動する写真の一覧
  let position = 0; // currentSet の中で、今開いている位置
  let opener = null; // ダイアログを開いたボタン（閉じたらここにフォーカスを戻す）

  /* ---------- 絞り込み ---------- */
  function applyFilter(filter) {
    currentFilter = filter;
    visibleIndexes = [];

    items.forEach((item, i) => {
      const show = matchesFilter(photos[i], filter);
      item.hidden = !show;
      if (show) visibleIndexes.push(i);
    });

    filterButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
    });

    if (status) status.textContent = `${FILTER_LABELS[filter]}：${visibleIndexes.length}枚の写真`;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  /* ---------- 拡大表示 ---------- */
  function showPhoto(pos) {
    // 端まで行ったら反対側へ（ループ）
    const total = currentSet.length;
    position = (pos + total) % total;
    const photo = currentSet[position];

    img.classList.remove('is-missing');
    img.src = `${IMAGE_DIR}${photo.file}`;
    img.alt = photo.alt;
    img.width = photo.width;
    img.height = photo.height;
    img.classList.toggle('is-dark-fur', Boolean(photo.darkFur));
    img.dataset.file = photo.file;
    delete img.dataset.fallback;

    caption.textContent = photo.caption;
    count.textContent = `${position + 1} / ${total}`;
  }

  function open(set, pos, button) {
    opener = button;
    currentSet = set;
    showPhoto(pos);
    dialog.showModal();
    document.body.classList.add('is-locked'); // 背景のスクロールを止める
  }

  list.addEventListener('click', (event) => {
    const button = event.target.closest('.gallery__button');
    if (!button) return;
    const set = visibleIndexes.map((i) => photos[i]);
    open(set, visibleIndexes.indexOf(Number(button.dataset.index)), button);
  });

  // 子猫のころ：押した猫の写真だけで前後に移動する
  document.querySelector('[data-kittens]')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-kitten]');
    if (button) open(kittenPhotos[button.dataset.kitten], Number(button.dataset.index), button);
  });

  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => showPhoto(position - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => showPhoto(position + 1));

  // 写真の外側（暗い背景部分）をクリックしたら閉じる
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // ← → キーで前後の写真へ
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(position - 1);
    if (event.key === 'ArrowRight') showPhoto(position + 1);
  });

  // 閉じたとき（×ボタン・Esc・背景クリックのどれでも）の後片付け
  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-locked');
    opener?.focus();
  });

  applyFilter(currentFilter);
}
