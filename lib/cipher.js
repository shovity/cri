'use strict';

const crypto = require('crypto');
const fs = require('fs');

module.exports = ({ inputUri, outputUri, password, algorithm = 'aes192', decipherMode }, callback) => {
    const done = (typeof callback === 'function')? callback : () => undefined;

    if (!inputUri) return done('inputUri is required');
    if (!outputUri) return done('outputUri is require');
    if (!password) return done('password is required');
    if (inputUri === outputUri) return done('inputUri and outputUri can not equal');

    const cipher = crypto.createCipher(algorithm, password);
    const decipher = crypto.createDecipher(algorithm, password);
    const input = fs.createReadStream(inputUri);
    const output = fs.createWriteStream(outputUri);


    input.pipe(decipherMode? decipher : cipher).pipe(output);
    output.on('finish', done);
}
