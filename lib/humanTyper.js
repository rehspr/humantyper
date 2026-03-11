// lib/humanTyper.js

/**
 * Simulates human typing of a given text.
 * @param {string} text - Full teext to type.
 * @param {function} insertFunc - Receives each typeed character.
 * @param {number} duration - Total duration in minutes.
 */
export async function humanType(text, insertFunc, duration) {
  const chars = text.split("");
  const delay = (duration * 60 * 1000) / chars.length;

  for (let i = 0; i < chars.length; i++) {
    // 5% chance of break 1–3 min
    if (Math.random() < 0.05) await sleep(random(60000, 180000));

    // 3% chance of typo
    if (Math.random() < 0.03) {
      await insertFunc(randomLetter());
      await sleep(200);
      await insertFunc("BACKSPACE");
    }

    await insertFunc(chars[i]);
    await sleep(delay + random(-100, 200));
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomLetter() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
}


