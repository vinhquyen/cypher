/**
 * @copyright ©Melqui Brito. All rights reserved.
 * @author Melqui Brito
 * @version 1.0.0 (2020-04-08)
 * @description Clean, fast and efficient methods for encryption and decryption of text data based on synchronous cryptography. Encryption and decryption is done by the use of symmetric keys.
 */

(function () {
    /**
     * @description Method appended to String.prototype to perform encryption
     * @param key: string
     * @requires key param, which must be a string and have its length different than zero
     * @returns encrypted string data
     */
    String.prototype.encrypt = function (key) {
        if (key && key.length && this.length) {
            let keys = encodeURIComponent(key).split(''),
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
                boundary = data.length > 127 ? 126 : data.length - 1,
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
        return undefined
    }

    /**
     * @description Method appended to String.prototype to perform decryption
     * @param key: string
     * @requires Key param which must be a string and have its length different than zero. 
     *           Use the same key that was used when encrypting this string instance.
     * @returns string
     */
    String.prototype.decrypt = function (key) {
        if (key && key.length && this.length) {
            let data = [],
                keys = encodeURIComponent(key).split(''),
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
        return undefined
    }

    /**
     * @description Method appended to String that returns a randomized string key
     * @returns string
     */
    String.getSymmetricKey = function () {
        return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            let n = Math.round(Math.random() * 93) + 33;
            while (n === 34 || n === 39 || n === 92){
                n = Math.round(Math.random() * 93) + 33;
            }
            return String.fromCharCode(n)
        })
    }
})();
