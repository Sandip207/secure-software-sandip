import crypto from 'crypto';

const message = "Російський військовий корабель, іди нахуй";
const hash = crypto.createHash('sha384').update(message, 'utf8').digest('hex');
console.log(hash);