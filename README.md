# Crypto
Clean, fast and efficient methods for encryption and decryption of text data based on synchronous cryptography. Encryption and decryption is done by the use of symmetric keys.

## Getting a key...
```javascript
  var KEY = String.getSymmetricKey();
```
Even though you can pretty much use any string with a length greater than zero as a key, I recommend you use this method.

## Encrypting...
```javascript
  let encryptedData = "whatever string data you would like to encrypt".encrypt(KEY);
```

## Decrypting...
```javascript
  let decryptedData = encryptedData.decrypt(KEY);
```
