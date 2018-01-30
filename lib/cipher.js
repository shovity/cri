'use strict';

const crypto = require('crypto');
const fs = require('fs');

module.exports = ({ inputUri, outputUri, password, algorithm = 'aes192', decipherMode }, callback) => {
    const done = (typeof callback === 'function')? callback : () => undefined;

    if (!fs.existsSync(inputUri)) {
        return done(`"${inputUri}" not exists.`);
    }

    if (fs.lstatSync(inputUri).isDirectory()) {
        return done('Input must be a file, zip it first.')
    }

    if (fs.existsSync(outputUri) && fs.lstatSync(outputUri).isDirectory()) {
        return done('Cannot replace a folder.')
    }

    if (!inputUri) {
        return done('InputUri is required.');
    }

    if (!outputUri) {
        return done('OutputUri is require.');
    }

    if (!password) {
        return done('Password is required.');
    }

    if (inputUri === outputUri) {
        return done('InputUri and outputUri can not equal.');
    }

    const cipher = crypto.createCipher(algorithm, password);
    const decipher = crypto.createDecipher(algorithm, password);
    const input = fs.createReadStream(inputUri);
    const output = fs.createWriteStream(outputUri);

    // stream
    input.pipe(decipherMode? decipher : cipher).pipe(output);

    // finish output stream
    output.on('finish', done);

    decipher.on('error', (err) => {
        // password incerect
        if (err.toString().indexOf('bad decrypt') !== -1) {
            fs.existsSync(outputUri) && fs.unlinkSync(outputUri);
            return done('Password not match.');
        }
        // other err
        done(err);
    });
}
