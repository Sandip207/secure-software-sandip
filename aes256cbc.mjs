aes256cbc.mjs
import crypto from 'crypto';

// Get command line arguments
const [,, mode, input, key, iv] = process.argv;

// Validate inputs
if (!['-e', '-d'].includes(mode) || !input || !key || !iv) {
  console.error("Usage: node aes256cbc.mjs -e|-d <message|hex> <32-byte-key> <16-byte-iv>");
  process.exit(1);
}

// Prepare buffers
const keyBuffer = Buffer.from(key, 'utf8');
const ivBuffer = Buffer.from(iv, 'utf8');
const algorithm = 'aes-256-cbc';

try {
  if (mode === '-e') {
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
    let encrypted = cipher.update(input, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted); // Output as hex
  } else if (mode === '-d') {
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
    let decrypted = decipher.update(input, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted); // Output original text
  }
} catch (err) {
  console.error("Encryption/Decryption failed:", err.message);
}
