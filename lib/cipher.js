'use strict';

const crypto = require('crypto');
const fs = require('fs');

module.exports = ({ inputUri, outputUri, password, algorithm = 'aes192', decipherMode }, callback) => {
    const done = (typeof callback === 'function')? callback : () => undefined;

    if (fs.existsSync(inputUri) && fs.lstatSync(inputUri).isDirectory()) {
        return done('Input must be a file, zip it first.')
    }

    if (fs.existsSync(outputUri) && fs.lstatSync(outputUri).isDirectory()) {
        return done('Output must be a file.')
    }

    if (!inputUri) {
        return done('InputUri is required');
    }

    if (!outputUri) {
        return done('OutputUri is require');
    }

    if (!password) {
        return done('Password is required');
    }

    if (inputUri === outputUri) {
        return done('InputUri and outputUri can not equal');
    }

    const cipher = crypto.createCipher(algorithm, password);
    const decipher = crypto.createDecipher(algorithm, password);
    const input = fs.createReadStream(inputUri);
    const output = fs.createWriteStream(outputUri);

    input.pipe(decipherMode? decipher : cipher).pipe(output);
    output.on('finish', done);
}
