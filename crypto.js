/**
 * @copyright ©Melqui Brito. All rights reserved.
 * @author Melqui Brito
 * @version 1.0.0 (2020-04-08)
 * @description Clean, fast and efficient methods for encryption and decryption of text and object data based on synchronous cryptography. Encryption and decryption is done by the use of symmetric keys.
 */

(function () {
    /**
     * @description Method appended to String.prototype to perform encryption
     * @param key: string
     * @requires key param, which must either be a string or an instance of an object that can be converted to string through toString method and have its length different than zero
     * @returns encrypted string data
     */
    String.prototype.encrypt = function (key) {
        let xKey = key ? key.toString() : undefined;
        if (xKey && xKey.length && this.length) {
            let keys = encodeURIComponent(xKey).split(''),
                data = encodeURIComponent(this).split(''),
                getChar = function (n) {
                    let code = n < 0 ? (127 + n) : n > 93 ? 32 + (n - 93) : (33 + n);
                    return String.fromCharCode(code)
                };

            let iKey = 0,
                iData = 0,
                keyCompleted = false,
                dataCompleted = false,
                keyIsLarger = keys.length > data.length;

            while (!(keyCompleted && dataCompleted)) {
                data[iData] = getChar(keys[iKey].charCodeAt(0) - data[iData].charCodeAt(0));
                iKey++;
                iData++;
                if (iKey === keys.length) {
                    iKey = 0;
                    keyCompleted = true
                }
                if (iData === (data.length)) {
                    iData = 0;
                    dataCompleted = true
                }
            }

            let endingPoint = keyIsLarger ? iData - 1 : iKey - 1,
                boundary = data.length > 93 ? 93 : data.length - 1,
                placer = Math.round(Math.random() * boundary);

            if (endingPoint < 0) {
                endingPoint = keyIsLarger ? data.length : keys.length;
                endingPoint--;
            }

            let endChar = String.fromCharCode(endingPoint + 33),
                placerChar = String.fromCharCode(126 - placer),
                enctrypted = data.join('');
            enctrypted = enctrypted.slice(0, placer) + endChar + enctrypted.slice(placer);
            return placerChar + enctrypted
        }
        return null
    }

    /**
     * @description Method appended to String.prototype to perform decryption
     * @param key: string
     * @requires Key param which must be a string and have its length different than zero. 
     *           Use the same key that was used when encrypting this string instance.
     * @returns string
     */
    String.prototype.decrypt = function (key) {
        let xKey = key ? key.toString() : undefined;
        if (xKey && xKey.length && this.length) {
            let data = [],
                keys = encodeURIComponent(xKey).split(''),
                pointer = 126 - this.charCodeAt(0),
                str = this.slice(1),
                startingPoint = str[pointer].charCodeAt(0) - 33;

            str = str.slice(0, pointer) + str.slice(pointer + 1);
            data = str.split('');

            let iKey = keys.length - 1,
                iData = data.length - 1,
                keyIsLarger = keys.length > data.length,
                limit = keyIsLarger ? keys.length : data.length;

            if (keyIsLarger) {
                iData = startingPoint
            } else {
                iKey = startingPoint
            }

            let handler_k = function () {
                    if (iKey < 0) { 
                        iKey = keys.length - 1;
                    }
                    if (iData === -1) {
                        iData = data.length - 1;
                    }
                },
                handler_d = function () {
                    if (iData < 0) {
                        iData = data.length - 1;
                    }
                    if (iKey === -1) {
                        iKey = keys.length - 1;
                    }
                };
            let update = keyIsLarger ? handler_k : handler_d;

            for (let i = 0; i < limit; i++) {
                let result = keys[iKey].charCodeAt(0) - (data[iData].charCodeAt(0) - 33);

                if (result < 33) {
                    result = keys[iKey].charCodeAt(0) - (data[iData].charCodeAt(0) - 127)
                }
                data[iData] = String.fromCharCode(result);

                iKey--;
                iData--;
                update()
            }
            try {
                let decryptedData = decodeURIComponent(data.join(''))
                return decryptedData
            } catch (e) {
                return data.join('')
            }
        }
        return null
    }

    /**
     * @description Method appended to String that returns a unique randomized string key
     * @returns string
     */
    String.getSymmetricKey = function () {
        let d = new Date().getTime(),
            m = (performance && performance.now && (performance.now() * 1000)) || -1,
            getChar = function (n) {
                let code = n > 93 ? 32 + (n - 93) : (33 + n);
                return String.fromCharCode(code)
            };
            d = d.toString();
            m = m.toString().slice(0, 4);
        return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyzz'.replace(/[xyz]/g, function (c) {
            let n;
            if (c === 'x') {
                n = Math.round(Math.random() * 93)
            } else {
                if (c === 'y') {
                    n = parseInt(d.slice(0, 2));
                    d = d.slice(2)
                }
                if (c === 'z') {
                    if (m > 0) {
                        n = parseInt(m.slice(0, 2));
                        m = m.slice(2)
                    } else {
                        n = Math.round(Math.random() * 93)
                    }
                }
            }
            if (n === 34 || n === 39 || n === 92){
                n++;
            }
            return getChar(n)
        })
    }

    /**
     * @description Method appended to Object.prototype to perform encryption
     * @param key
     * @requires Key 
     * @returns JSON object: {"enctypted-data": "encrypted string data here"} or null if no key is passed in
     */
    Object.prototype.encrypt = function(key) {
        let data = JSON.stringify(this).encrypt(key);
        return data ? {'encrypted-data': data} : null
    }

    /**
     * @description Method appended to Object.prototype to perform decryption
     * @param key
     * @requires Key that was used when encrypting this Object instance.
     * @returns JSON object or null if the actual object does not have the target property 'encrypted-data', or the target property is not of type "string" or any error occurred either during decryption or JSON parsing process.
     */
    Object.prototype.decrypt = function(key) {
        if(this.hasOwnProperty('encrypted-data')) {
            if(typeof this['encrypted-data'] === "string") {
                try {
                    let data = JSON.parse(this['encrypted-data'].decrypt(key));
                    return data
                } catch (e) {
                    return null
                }
            }
        }
        return null
    }

    Object.encrypt = function (data, key, asObject = true) {
        try {
            let encryptedData = data.encrypt(key)
            encryptedData = typeof encryptedData === "object" && !asObject ? encryptedData['encrypted-data'] : encryptedData
            return encryptedData
        } catch (e) {
            return undefined
        }
    }

    Object.decrypt = function (data, key, asObject = true) {
        let dataType = typeof data;
        try {
            let object;
            if(asObject) {
                object = dataType === "object" ? data.decrypt(key) : JSON.parse(data.decrypt(key))
            } else {
                object = data.decrypt(key);
                if (dataType === "number" || dataType === "object") {
                    object = JSON.stringify(object)
                }
            }
            return object
        } catch (e) {
            return undefined
        }
    }
})();
