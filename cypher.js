/**
 * @copyright ©Melqui Brito. All rights reserved.
 * @author Melqui Brito
 * @version 1.0.0 (2020-04-19)
 * @description Clean, fast and efficient methods appended to String.prototype and Object.prototype for encryption and decryption based on synchronous cryptography.
 * Encryption and decryption are done by the use of symmetric keys.
 */

(function () {
    
    /**
     * @description Method appended to String.prototype to perform encryption
     * @param key
     * @requires key param, which must either be a string or an instance of an object that can be converted to string through toString method and have its length different than zero
     * @returns {string|null}
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
            let startingPoint = {key: Math.floor(Math.random() * keys.length), data: Math.floor(Math.random() * data.length)};
            let iKey = startingPoint.key,
                iData = startingPoint.data,
                keyCompleted = false,
                dataCompleted = false;

            let update = function () {
                if (iKey === keys.length) {
                    iKey = 0;
                }
                if (iKey === startingPoint.key) {
                    keyCompleted = true
                }
                if (iData === (data.length)) {
                    iData = 0;
                }
                if (iData === startingPoint.data) {
                    dataCompleted = true
                }
            }

            while (!(keyCompleted && dataCompleted)) {
                data[iData] = getChar(keys[iKey].charCodeAt(0) - data[iData].charCodeAt(0));
                iKey++;
                iData++;
                update()
            }

            let endingPoint = {
                    key: iKey === 0 ? keys.length - 1 : iKey - 1,
                    data: iData === 0 ? data.length - 1 : iData - 1
                },
                boundary = data.length > 93 ? 93 : data.length - 1,
                placer = {
                    key: Math.round(Math.random() * boundary),
                    data: Math.round(Math.random() * boundary)
                };
            let endChar = {
                    key: String.fromCharCode(127 - endingPoint.key.toString().length),
                    data: String.fromCharCode(127 - endingPoint.data.toString().length)
                },
                placerChar = {
                    key: String.fromCharCode(126 - placer.key),
                    data: String.fromCharCode(126 - placer.data)
                },
                encrypted = data.join('');

            encrypted = encrypted.slice(0, placer.key) + endChar.key + endingPoint.key + encrypted.slice(placer.key);
            encrypted = encrypted.slice(0, placer.data) + endChar.data + endingPoint.data + encrypted.slice(placer.data);
            return placerChar.key + encrypted + placerChar.data
        }
        return null
    }
    
    /**
     * @description Method appended to String.prototype to perform decryption
     * @param key
     * @requires Key param which must be a string and have its length greater than zero.
     *           Use the same key that was used when encrypting this string instance.
     * @returns {string|null}
     */
    String.prototype.decrypt = function (key) {
        let xKey = key ? key.toString() : undefined;
        if (xKey && xKey.length && this.length) {
            let data = [],
                keys = encodeURIComponent(xKey).split(''),
                pointer = {
                    key: 126 - this.charCodeAt(0),
                    data: 126 - this.charCodeAt(this.length - 1)
                },
                str = this.slice(1, this.length - 1),
                startingPoint = {
                    key: undefined,
                    data: parseInt(str.slice(pointer.data + 1, pointer.data + (128 - str[pointer.data].charCodeAt(0))))
                };

            str = str.slice(0, pointer.data) + str.slice(pointer.data + (128 - str[pointer.data].charCodeAt(0)));
            startingPoint.key = parseInt(str.slice(pointer.key + 1, pointer.key + 1 + (127 - str[pointer.key].charCodeAt(0))));
            str = str.slice(0, pointer.key) + str.slice(pointer.key + (128 - str[pointer.key].charCodeAt(0)));

            data = str.split('');
            let iKey = startingPoint.key,
                iData = startingPoint.data,
                keyCompleted = false,
                dataCompleted = false;

            let update = function () {
                if (iKey === -1) {
                    iKey = keys.length - 1
                }
                if (iData === -1) {
                    iData = data.length - 1
                }
                if (iKey === startingPoint.key) {
                    keyCompleted = true
                }
                if (iData === startingPoint.data) {
                    dataCompleted = true
                }
            }

            while (!(keyCompleted && dataCompleted)) {
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
     * @description Method that returns a unique randomized string key
     * @returns {string}
     */
    this.getSymmetricKey = function () {
        let d = new Date().getTime(),
            m = (performance && performance.now && (performance.now() * 1000)) || -1,
            getChar = function (n) {
                let code = n > 93 ? 32 + (n - 93) : (33 + n);
                if (code === 34 || code === 39 || code === 92 || code === 96) {
                    code++;
                }
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
            return getChar(n)
        })
    }

    /**
     * @description Method appended to Object.prototype to perform encryption
     * @param key
     * @requires Key
     * @returns {{"enctypted-data": string}|null}
     */
    Object.prototype.encrypt = function(key) {
        let data = JSON.stringify(this).encrypt(key);
        return data ? {'encrypted-data': data} : null
    }

    /**
     * @description Method appended to Object.prototype to perform decryption
     * @param key
     * @requires Key that was used when encrypting this Object instance.
     * @returns {{"enctypted-data": string}|null}
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

    /**
     * @param data
     * @param key
     * @param asObject
     * @returns {{"enctypted-data": string}|string|null}
     */
    Object.encrypt = function (data, key, asObject = true) {
        try {
            let encryptedData = data.encrypt(key);
            encryptedData = typeof encryptedData === "object" && !asObject ? encryptedData['encrypted-data'] : encryptedData;
            return encryptedData
        } catch (e) {
            return null
        }
    }

    /**
     * @param data
     * @param key
     * @param asObject
     * @returns {{"enctypted-data": string}|string|null}
     */
    Object.decrypt = function (data, key, asObject = true) {
        let dataType = typeof data,
            result = data.decrypt(key);
        try {
            if(asObject) {
                result = dataType === "object" ? result : JSON.parse(result)
            } else {
                if (dataType === "number" || dataType === "object") {
                    result = JSON.stringify(result)
                }
            }
            return result
        } catch (e) {
            return null
        }
    }
})();
