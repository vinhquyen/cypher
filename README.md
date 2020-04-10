# Crypto
Clean, fast and efficient methods appended to String.prototype and Object.prototype for encryption and decryption based on synchronous cryptography. Encryption and decryption are done by the use of symmetric keys.

## Getting a SAFE and UNIQUE key
```javascript
  var KEY = String.getSymmetricKey();
```
You can actually use anything as a key. Just have in mind that it's going to be converted to string down the road.

## Encrypting and decrypting String type data
```javascript
  /** Encrypting through String.prototype.encrypt **/
  let str = "Hi there!".encrypt(KEY); // directly
  str = "I am a string. Deal with it!";
  str = str.encrypt(KEY); // indirectly
  
  /** Decrypting through String.prototype.decrypt **/
  str = str.decrypt(KEY); 

  /** Encrypting through Object.encrypt **/
  str = "You can encrypt me in many different ways...";
  let a = Object.encrypt(message); // returns an object like {'encrypted-data': 'encrypted string data here'} 
  let b = Object.encrypt(message)['encrypted-data']; // returns the encrypted string data
  let c = Object.encrypt(message, false); // false here means you want only the encrypted string data to be returned
```
> Note: Type of __a__ is _"object"_, types of __b__ and __c__ are both _"string"_.

```javascript
  /** Decrypting through Object.decrypt **/
  /* The trick here is to set the second parameter to false (it is true by default), 
     which means you don't want it to try to convert the result to object since 
     you know you are expecting a string to be returned, not an object type data. */
  let data = Object.decrypt(encryptedStringData, false);
```

## Encrypting and decrypting Object type data
* Objects
```javascript
  /* Decrypting... */
  var user = {
    firstname: "Someone's name",
    lastname: "Someone's lastname",
    email: "example@hostserver.com"
  }
  let a = user.encrypt(KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  let b = Object.encrypt(user, KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  
  let c = user.encrypt(KEY)['encrypted-data']; // returns the encrypted string data straight forwardly
  let d = Object.encrypt(user, KEY)['encrypted-data']; // returns the encrypted string data straight forwardly
  let e = Object.encrypt(user, KEY, false); // false here means you want only the encrypted string data to be returned
```
> Note: Types of __a__ and __b__ are both _"object"_. Types of __c__, __d__ and __e__ are _"string"_.

```javascript
  /* Decrypting... */
  // a and b return the original object if the key passed in is the same used when encrypting; otherwise, returns null.
  let a = encryptedObject.decrypt(KEY); 
  let b = Object.decrypt(encryptedObject, KEY);
  
  // c, d and e return the original object, but stringified. It will likely return null if key doesn't match the original one used to encrypt the object.
  let c = user.decrypt(KEY);
  let d = Object.decrypt(user, KEY, false);
```
* Numbers
```javascript
  /* Encrypting... */
  var number = 42876312;
  let a = Object.encrypt(number, KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  let b = Object.encrypt(number, KEY)['encrypted-data']; // returns the encrypted string data straight forwardly
  let c = Object.encrypt(number, KEY, false); // false here forces it to return a string, rather than an object type data.
```

