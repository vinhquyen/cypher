# Crypto
Clean, fast and efficient methods for encryption and decryption of text data based on synchronous cryptography. Encryption and decryption is done by the use of symmetric keys.

## Getting a key...
```javascript
  var KEY = String.getSymmetricKey();
```
You can pretty much use anything as a key. Just make sure it isn't too short and nor too long.

## Encrypting...
```javascript
  let encryptedData = "whatever string data you would like to encrypt".encrypt(KEY);
```

## Decrypting...
```javascript
  let decryptedData = encryptedData.decrypt(KEY);
```
