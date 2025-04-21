rsa512.js
const { TextEncoder, TextDecoder } = require('util');

// BigInt values
const p = BigInt("100392089237316158323570985008687907853269981005640569039457584007913129640081");
const q = BigInt("90392089237316158323570985008687907853269981005640569039457584007913129640041");
const e = BigInt(65537);

// Step 1: Calculate N and phi(N)
const N = p * q;
const phi = (p - 1n) * (q - 1n);

// Step 2: Compute modular inverse (d = e^-1 mod phi)
function modInverse(a, m) {
  let m0 = m, x0 = 0n, x1 = 1n;
  while (a > 1n) {
    let q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return x1 < 0n ? x1 + m0 : x1;
}
const d = modInverse(e, phi);

// Step 3: Encode message as BigInt
const message = "Scaramouche, Scaramouche, will you do the Fandango? 💃🏽";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const mBytes = encoder.encode(message);
const m = BigInt("0x" + Buffer.from(mBytes).toString("hex"));

// Step 4: Encrypt and Decrypt
const ciphertext = modPow(m, e, N);
const decrypted = modPow(ciphertext, d, N);

// Convert decrypted BigInt back to UTF-8 string
function bigintToText(bi) {
  const hex = bi.toString(16);
  const paddedHex = hex.length % 2 ? '0' + hex : hex;
  return decoder.decode(Buffer.from(paddedHex, 'hex'));
}

// Modular exponentiation
function modPow(base, exponent, modulus) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
}

// Output
console.log("N:", N.toString());
console.log("d:", d.toString());
console.log("Ciphertext (hex):", ciphertext.toString(16));
console.log("Decrypted message:", bigintToText(decrypted));
