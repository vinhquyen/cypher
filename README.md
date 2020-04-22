# Cypher
Secure, clean, fast and efficient methods appended to String.prototype and Object.prototype for encryption and decryption based on synchronous cryptography. Encryption and decryption are done by the use of symmetric keys.

## About
Cypher does not encrypt through allocation based on mapping patterns. Cypher encryption process is completely mathematical and therefore, no pattern can be observed in the encrypted data result. Furthermore, Cypher encryption process result is not persistent, which means that encrypting a particular object with a particular key multiple times is highly unlikely to result in the same data - see demonstration below.

```javascript
let data = "Cypher AAA", key = "_b7gBiG1oo";

console.log(data.encrypt(key)); // Possible OUTPUT: x%7~(yo~6}103V3I'Iv
console.log(data.encrypt(key)); // Possible OUTPUT: xMeqv|D~~21c1Z'oOw
console.log(data.encrypt(key)); // Possible OUTPUT: tmu~4~v|l^&X"~1I'|
```

## Methods 
### getSymmetricKey
 * returns: string
 
### String.prototype.encrypt
 * params: 
      * __key__ -> Either a string or anything that implements toString method.
 * returns: string\|null
 
### String.prototype.decrypt
 * params: 
      * __key__ -> Either a string or anything that implements toString method.
 * returns: string\|null
 
### Object.prototype.encrypt
 * params: 
      * __key__ -> Either a string or anything that implements toString method.
 * returns: {'encrypted-data': string}\|null
 
### Object.prototype.decrypt
 * params: 
      * __key__ -> Either a string or anything that implements toString method.
 * returns: {'encrypted-data': string}\|null
 
### Object.encrypt
 * params: 
      * __data__ -> Pretty much anything
      * __key__ -> Either a string or anything that implements toString method.
      * __asObject__ -> Boolean to determine whether the result should be returned as a prototype of Object or a prototype of String.
 * returns: {'encrypted-data': string}\|string\|null
 
### Object.decrypt
 * params: 
      * __data__ -> Pretty much anything
      * __key__ -> Either a string or anything that implements toString method.
      * __asObject__ -> Boolean to determine whether the result should be returned as a prototype of Object or a prototype of String.
 * returns: {'encrypted-data': string}\|string\|null
 
## Tutorial
### Getting a SAFE and UNIQUE key
```javascript
  var KEY = getSymmetricKey();
```
You can actually use anything as a key. Just have in mind that it's going to be converted to string down the road.

### Encrypting and decrypting String data type
```javascript
  /** Encrypting through String.prototype.encrypt **/
  let str = "Hi there!".encrypt(KEY); // directly
  str = "I am a string. Deal with it!";
  str = str.encrypt(KEY); // indirectly
  
  /** Decrypting through String.prototype.decrypt **/
  str = str.decrypt(KEY); 

  /** Encrypting through Object.encrypt **/
  let message = "You can encrypt me in many different ways...";
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

### Encrypting and decrypting Object data type
* Objects
```javascript
  /** Encrypting... **/
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
  /** Decrypting... **/
  // a and b return the original object if the key passed in is the same used when encrypting; otherwise, returns null.
  let a = encryptedObject.decrypt(KEY); 
  let b = Object.decrypt(encryptedObject, KEY);
  
  // returns the original object, but stringified. It will likely return null if key doesn't match the original one used to encrypt the object.
  let d = Object.decrypt(encryptedObject, KEY, false);
```
* Numbers
```javascript
  /** Encrypting... **/
  var number = 42876312;
  let a = Object.encrypt(number, KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  let b = Object.encrypt(number, KEY)['encrypted-data']; // returns the encrypted string data straight forwardly
  let c = Object.encrypt(number, KEY, false); // false here forces it to return a string, rather than an object type data.
```
> Note: You can perform decryption directly by calling the method decrypt, but if what you have to perform decryption on is a string, you'll get the original object stringified.

```javascript
  /** Decrypting... **/
  let a = encryptedNumber.decrypt(key) // calling decrypt directly returns the original number as either a number or a string depending on what type encryptedNumber is. If it's a string, calling decrypt directly returns a string. If it's an object, it returns the original number as a "number" type of object.
  let b = Object.decrypt(encryptedNumber, KEY) // returns the original number
  let c = Object.decrypt(encryptedNumber, KEY, false) // returns the original number, but as a string.
```
* Arrays
```javascript
  /** Encrypting... **/
  var array = [1, 'x', {x: 1}, ['x', '1']];
  let a = array.encrypt(KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  let b = Object.encrypt(array, KEY); // returns an object like {'encrypted-data': 'encrypted string data here'}
  let c = Object.encrypt(array, KEY)['encrypted-data']; // returns the encrypted string data straight forwardly
  let d = Object.encrypt(array, KEY, false); // false here forces it to return a string, rather than an object type data.
```
```javascript
  /** Decrypting... **/
  let a = encryptedArray.decrypt(key) // calling decrypt directly returns the original array as either an array or string depending on what type encryptedArray is. If it's a string, calling decrypt directly returns the array stringified. If it's an object, it returns the original array.
  let b = Object.decrypt(encryptedArray, KEY) // returns the original array
  let c = Object.decrypt(encryptedArray, KEY, false) // returns the original array, but stringified.
```
### Testing
Are looking for a quick way to test Cypher out before using it? Just go [here](https://playcode.io/548162) and have fun! Do your testing on __testing.js__.

## Author
* [Melqui Brito](https://github.com/melquibrito)

## License
This project is licensed under the __MIT License__ - see the [LICENSE](LICENSE.md) file for more details.
