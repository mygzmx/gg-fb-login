import { KEYUTIL, KJUR, hextob64 } from 'jsrsasign';
// import { KEYUTIL, KJUR, hextob64, hextob64u, b64tohex, RSAKey } from 'jsrsasign';

// const publicContent = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp1oFNHnWsKqbtIomysBDLd1DPV//1BF6Me2ZBt4kO42rcXnaMwz1UqjwRMP9KlpIhKlzJ4QOPKN9n6LTy+sg9KfAPnz+naTrLDwHzmmVl5emG9fRcSvabpoJ0d/eTPXwNUahHMlSrCdvoP5/Clm7psOn120d87QZSVGn6g/Ok8epK++i1oX2010kuBFFZl8Lt/a3vlk1c2EU6j+p6pCpKuQp/gbLWw3nJw1IDi13AJbTqDEGyLAt7JuNtVP/hU36YfGrmUcNpzQaBOVmLaUhST/pwepfVm+ymO4Vo1vzZHTb4/3nWFp2is ObcUbLJMXFmxWJjzvCe9mvtbiwSzi11wIDAQAB';
// const publicKey = `-----BEGIN PUBLIC KEY-----\n${publicContent}\n-----END PUBLIC KEY-----`;

const privateContent = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnWgU0edawqpu0iibKwEMt3UM9X//UEXox7ZkG3iQ7jatxedozDPVSqPBEw/0qWkiEqXMnhA48o32fotPL6yD0p8A+fP6dpOssPAfOaZWXl6Yb19FxK9pumgnR395M9fA1RqEcyVKsJ2+g/n8KWbumw6fXbR3ztBlJUafqD86Tx6kr76LWhfbTXSS4EUVmXwu39re+WTVzYRTqP6nqkKkq5Cn+BstbDecnDUgOLXcAltOoMQbIsC3sm421U/+FTfph8auZRw2nNBoE5WYtpSFJP+nB6l9Wb7KY7hWjW/NkdNvj/edYWnaKw5txRsskxcWbFYmPO8J72a+1uLBLOLXXAgMBAAECggEAdq8C7fpSZaw5DMrFRBkiC47Vtts0RaO3c107n4E/VPTd13ZBZt8TxHGHJF2SV8z7jQnXXvjqV9ripqoFZqL0Fk45qpdew1JIbnCMYLjEnGOyLCDcqlQdbz7TJAKOVyo8FqxmalHkza6SHi0ez6pfyJ8Nk1wRV9or7LF6UiavrGFPi30p8K6i9eReqglH88IsysEHlMwEThLaBe2EU4tN2txD9pPk/WttSxPryUPntnaTx6yc7+Q69T0ibdyULpJOanCmegZ55Uld3qPE0HW7dz5gKCjigfeNEupR27q5FYm0QjyCiVTjbkipzlqFy7HHwbZOdRbgD+qneLa2iJJ78QKBgQDnj1tqfZbKbHs0wCiWYjqPbytH9Cfq4xpXjxpd62weOjk2hlkb0WaV8majMVurW3Bjjl2kOY+vrGpKT0FYJCtVnudVG9gAuLApCB2F/a3ljyvhZgGFQG9t1yY9jhl5QSHKoaN4OgbjqgN0jmTae/1lnvj+fQXP99o09rw4NUA5WwKBgQC5A8idfF6UcduwMdprBRmnXNg/FANCr8lgoV//4aqC3U/jd7kqrY1kiTEZURsRe/tdN9eRVIEqIsHcU+9elGD/4b88qjKKTkJbYSvWbQvYNtthf0xSh6Fh4W7PDLgXDxhGvfWLrDcassT59SJcUS+kQOflov9KcNCysxlVxmhiNQKBgHsZYufBzB/ge78XSHxpy+fkmYWu7mmYQbC6irHTLa8EFNY/pa98KqUcMCQhYTI/cgf67x0W3KPvbLIEYCCTWdYym5hLLRF1HXEytz88FO4spo80wyorjxE9hz7CBBjJ30TxmQ2ZC4CMKToVWNgtghA76vKfVC+y+3WclYLsDDBxAoGASIEuFmGN4xi3olX3JaeLBSaCbD3YhULEZUT4jRuPqdc3Hoplm08GMRb+kdBSDkkLGd3vcbmvIKccV87g6Ky3Uq/SNODyC3dd09fByTdUw/fDg3LSoykZ2nTw6t0uK4Mz3U1GM+VadvEF9nrVa145kGILPtfgufh6IP3E+PNXJt0CgYBxC0x3bBri50LB7pTIZR3ChOSv1uu1D2YwBWod5HygZFL7S/Isj8TZd6T0VdWlKiT27jNh0vt6Sh35+VacuPKsu/McKrZzTs17EfjsSHsvdYOdO7BZsfKbDqbnNAMmVKKIHn1wJz7kSuCaiyTQSalKY1+Z2ekeTn0W9cMohCN7uQ==';
const privateKey = `-----BEGIN PRIVATE KEY-----\n${privateContent}\n-----END PRIVATE KEY-----`;

// 加签
export const addSign = (msg: string) => {
  // 构建 signature 实例, 传入 key 初始化 -> 签名
  const signature = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
  signature.init(KEYUTIL.getKey(privateKey));
  signature.updateString(msg);
  const str = signature.sign(); // 签名, 得到16进制字符结果
  return hextob64(str);
}

// // 验签
// export const verifySign = (msg: string, sign: string) => {
//   const signatureVf = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
//   signatureVf.init(KEYUTIL.getKey(publicKey));
//   signatureVf.updateString(msg);
//   // !接受的参数是16进制字符串!
//   return signatureVf.verify(b64tohex(sign));
// }

// // 加密
// const encryptRSA = (msg: string) => {
//   const pub = KEYUTIL.getKey(publicKey) as RSAKey;
//   console.log('pub', pub)
//   return KJUR.crypto.Cipher.encrypt(msg, pub, 'SHA256withRSA');
// }
//
// // 解密
// const decryptRSA = (msg: string) => {
//   const priv = KEYUTIL.getKey(privateKey) as RSAKey;
//   console.log('priv', priv)
//   return KJUR.crypto.Cipher.decrypt(msg, priv, 'SHA256withRSA');
// }

//
// const msg = "chenyi@dianzhong.com"
// const txt = "Q7dEqN6AT6j+WvxwbW2V0Rx0ajn1NMq0QUIzid0u5iV50+elpwdI5tH/Diln/qdaPiH8nc3tg8+gFPPWpolVRN6rmf0XsvET/Ajncv7yoeukFGeXdNSsn7EAYezzNSh5msECQdEAhtn7wSgWtqkAHsSHWVybldSgB4p4so5DnkQZkW9R7//lZBb2yctSx7I1x4V2dysOYSCfsRsq3c+SgtC6kUdUxX7PuJ8kWZOXxSuVGLaRrBWpge9UY8w4J2WtMqmgx4fEF0JeIFF30NjMV+to2lLZkAKzjNzxtOJXSkJyGqKQ1BfyB14iQ+bMwXf3DnX+fSvwtWfkaKZSolamjg=="
//
// const sign = addSign(msg);
// console.log('签名:::\n', sign);
// console.log('验签:::\n', verifySign(msg, sign));
