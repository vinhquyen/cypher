# Crypto
Clean, fast and efficient methods appended to String.prototype and Object.prototype for encryption and decryption based on synchronous cryptography. Encryption and decryption are done by the use of symmetric keys.

## Getting a key
```javascript
  var KEY = String.getSymmetricKey();
```
Even though you can pretty much use any string with a length greater than zero as a key, I recommend you use this method.

## Encrypting and decrypting String data
```javascript
  let encryptedString = "whatever string data you would like to encrypt".encrypt(KEY);
  let decryptedString = encryptedString.decrypt(KEY);
```

## Encrypting and decrypting Object data
```javascript
  let objectSample = {
    firstname: "Someone's name",
    lastname: "Someone's lastname",
    email: "example@hostserver.com"
  }
  let encryptedObject = objectSample.encrypt(KEY);
  let decryptedObject = encryptedObject.decrypt(KEY);
```
