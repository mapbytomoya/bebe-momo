/**
 * interactions.js — ボタンを押したときの小さな演出
 *   A. べべをなでる（ハート＆肉球 → べべのひとこと → 少し遅れてももが登場）
 *   B. ももを呼ぶ（ランダムな吹き出し）
 *   C. 肉球メッセージ
 */
import { messages } from './data.js';

/** 一度に画面に出すハート・肉球の上限（連打しても重くならないように） */
const MAX_PARTICLES = 14;

/** もも登場までの待ち時間（ミリ秒） */
const MOMO_DELAY = 900;

/** 吹き出しを表示しておく時間（ミリ秒） */
const BUBBLE_DURATION = 2600;

/** 吹き出しごとの「消すタイマー」を覚えておく入れ物（要素 → タイマーID） */
const hideTimers = new WeakMap();

/**
 * 配列からランダムに1つ選ぶ。前回と同じものは避ける。
 * @param {string[]} list
 * @param {string} [previous] 前回選ばれた文字列
 */
function pickRandom(list, previous) {
  const candidates = list.length > 1 ? list.filter((item) => item !== previous) : list;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * 吹き出しを表示して、一定時間後に消す。
 * 連打されたときは前のタイマーを止めて表示し直すので、表示が重ならない。
 */
function showBubble(el, text, duration = BUBBLE_DURATION) {
  clearTimeout(hideTimers.get(el));
  el.textContent = text;
  // クラスを付け直してアニメーションを再生し直す
  el.classList.remove('is-shown');
  void el.offsetWidth; // ← ブラウザに一度レイアウトを計算させる小技（アニメのリセット用）
  el.classList.add('is-shown');
  hideTimers.set(el, setTimeout(() => el.classList.remove('is-shown'), duration));
}

/** ハートや肉球を1つ、ふわっと浮かべる */
function spawnParticle(layer) {
  if (layer.childElementCount >= MAX_PARTICLES) return;

  const kind = Math.random() < 0.6 ? 'heart' : 'paw';
  const particle = document.createElement('span');
  particle.className = `particle particle--${kind}`;
  particle.innerHTML = `<svg class="icon"><use href="#icon-${kind}"/></svg>`;

  // 位置・大きさ・傾きを少しずつバラけさせる（CSS変数で渡す）
  particle.style.setProperty('--x', `${10 + Math.random() * 80}%`);
  particle.style.setProperty('--size', `${16 + Math.random() * 14}px`);
  particle.style.setProperty('--tilt', `${-25 + Math.random() * 50}deg`);
  particle.style.setProperty('--drift', `${-20 + Math.random() * 40}px`);

  // アニメーションが終わったら自動で削除（prefers-reduced-motion 時の保険でタイマーも）
  const remove = () => particle.remove();
  particle.addEventListener('animationend', remove, { once: true });
  setTimeout(remove, 2000);

  layer.append(particle);
}

/* ---------- A. べべをなでる ---------- */
function setupPetBebe() {
  const box = document.querySelector('[data-interact="bebe"]');
  if (!box) return;

  const button = box.querySelector('[data-action="pet-bebe"]');
  const layer = box.querySelector('[data-fx]');
  const bubble = box.querySelector('[data-bubble]');
  const cameo = box.querySelector('[data-cameo]');
  const cameoText = box.querySelector('[data-cameo-text]');

  let momoTimer = null;
  let cameoHideTimer = null;
  let lastMessage = '';

  button.addEventListener('click', () => {
    // 1. ハートや肉球を3つ
    for (let i = 0; i < 3; i++) setTimeout(() => spawnParticle(layer), i * 90);

    // 2. べべのひとこと
    lastMessage = pickRandom(messages.bebePet, lastMessage);
    showBubble(bubble, lastMessage);

    // 3. 少し遅れてももが「わたしも！」
    //    連打中はタイマーを作り直すだけなので、ももは1匹しか出てこない
    clearTimeout(momoTimer);
    clearTimeout(cameoHideTimer);
    momoTimer = setTimeout(() => {
      cameoText.textContent = messages.momoMeToo;
      cameo.classList.add('is-shown');
      cameoHideTimer = setTimeout(() => {
        cameo.classList.remove('is-shown');
        cameoText.textContent = '';
      }, BUBBLE_DURATION + 400);
    }, MOMO_DELAY);
  });
}

/* ---------- B. ももを呼ぶ ---------- */
function setupCallMomo() {
  const box = document.querySelector('[data-interact="momo"]');
  if (!box) return;

  const button = box.querySelector('[data-action="call-momo"]');
  const bubble = box.querySelector('[data-bubble]');
  const card = box.closest('.profile');
  let lastMessage = '';

  button.addEventListener('click', () => {
    lastMessage = pickRandom(messages.momoCall, lastMessage);
    showBubble(bubble, lastMessage);

    // カードの猫アイコンをぴょんと跳ねさせる
    card.classList.remove('is-hopping');
    void card.offsetWidth;
    card.classList.add('is-hopping');
  });
}

/* ---------- C. 肉球メッセージ ---------- */
function setupPawButtons() {
  let lastMessage = '';

  document.querySelectorAll('[data-paw]').forEach((button) => {
    // ボタンの直後にある吹き出し用の <p data-paw-message>
    const output = button.parentElement.querySelector('[data-paw-message]');

    button.addEventListener('click', () => {
      lastMessage = pickRandom(messages.paw, lastMessage);
      if (output) showBubble(output, lastMessage, 3200);

      button.classList.remove('is-pressed');
      void button.offsetWidth;
      button.classList.add('is-pressed');
    });
  });
}

export function setupInteractions() {
  setupPetBebe();
  setupCallMomo();
  setupPawButtons();
}
