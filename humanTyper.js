// lib/humanTyper.js

/**
* Simulates human typing of a given text.
* @param {string} text - The full text to type.
* @param {function} insertFunc - A function that receives each character typed.
* @param {number} duration - Total duration in minutes for typing the full text.
*/
export async function humanType(text, insertFunc, duration) {
const chars = text.split("");
// Calculate approximate delay per character
const delay = (duration * 60 * 1000) / chars.length;

for (let i = 0; i < chars.length; i++) {
// 5% chance to take a random break (1–3 minutes)
if (Math.random() < 0.05) await sleep(random(60000, 180000));

// 3% chance to make a typo
if (Math.random() < 0.03) {
await insertFunc(randomLetter()); // insert wrong char
await sleep(200);
await insertFunc("BACKSPACE"); // correct it
}

// Type the actual character
await insertFunc(chars[i]);

// Add small random variation to simulate natural typing speed
await sleep(delay + random(-100, 200));
}
}

/**
* Helper: pause execution for ms milliseconds
* @param {number} ms
*/
function sleep(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
* Helper: random number between min and max
* @param {number} min
* @param {number} max
*/
function random(min, max) {
return Math.random() * (max - min) + min;
}

/**
* Helper: returns a random lowercase letter
*/
function randomLetter() {
const letters = "abcdefghijklmnopqrstuvwxyz";
return letters[Math.floor(Math.random() * letters.length)];
}