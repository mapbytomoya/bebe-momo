/**
 * main.js — サイトの入り口（index.html から読み込まれる唯一のスクリプト）
 *
 * 流れ：
 *   1. 画像が見つからなかったときの代わり画像を準備
 *   2. data.js の内容で HTML を描画（render.js）
 *   3. ボタンやギャラリーなどの動きを登録
 *   4. スクロールでふわっと表示
 */
import { renderAll } from './render.js';
import { setupInteractions } from './interactions.js';
import { setupGallery } from './gallery.js';

const PLACEHOLDER = 'assets/images/placeholder.svg';

/**
 * 画像が読み込めなかった（404など）ときに、プレースホルダー画像へ差し替える。
 * error イベントは親要素へ伝わらないため、「キャプチャ」(第3引数 true) で受け取ります。
 */
function setupImageFallback() {
  document.addEventListener(
    'error',
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.fallback) return; // プレースホルダー自体が失敗したときの無限ループ防止

      img.dataset.fallback = 'true';
      img.classList.add('is-missing');
      img.src = PLACEHOLDER;

      // 枠に「どのファイルを置けばいいか」を表示する（CSS の ::after で使用）
      const frame = img.closest('.photo');
      if (frame && img.dataset.file) frame.dataset.missing = img.dataset.file;

      console.info(`[画像] ${img.dataset.file ?? img.src} が見つからないため、プレースホルダーを表示しています`);
    },
    true,
  );
}

/**
 * スクロールして画面に入った要素（.reveal）に .is-visible を付ける。
 * 動きを減らす設定（prefers-reduced-motion）の人には、最初から全部表示する。
 */
function setupReveal() {
  const targets = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度表示したら監視をやめる
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
}

setupImageFallback();
renderAll();
setupInteractions();
setupGallery();
setupReveal();
