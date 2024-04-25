import CryptoJS from 'crypto-js';
import { hextob64, b64tohex } from 'jsrsasign';

// 这是密钥，非常重要，可以是后台获取，或者是前后台约定好，注意保护
const key = CryptoJS.enc.Utf8.parse('mjlsd5rsoz9i41uk');
const iv = CryptoJS.enc.Utf8.parse('ubj7m9mlhmoj2jcu');

/**
 * 解密
 * @param {String} word 解密内容
 * @returns
 */
export function decryptAES(word: string) {
  const _word = hextob64(word)
  const base64 = CryptoJS.enc.Base64.parse(_word);
  const src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypt.toString(CryptoJS.enc.Utf8);
}

/**
 * 加密
 * @param {String} word 加密内容
 * @returns
 */
export function encryptAES(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return b64tohex(CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
}

