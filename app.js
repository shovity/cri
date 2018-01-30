'use strict';

const path = require('path');
const fs = require('fs');
const cipher = require('./lib/cipher');

module.exports = (params) => {

    const inputUri = params.inputUri;

    // detect decipherMode
    const decipherMode = inputUri.split('.').slice(-1)[0] === 'cri';

    const outputUri = decipherMode
        ? `${params.outputUri || inputUri.replace('.cri', '')}`
        : `${params.outputUri || inputUri}.cri`;

    const password = params.password || 'tluafed-terces';

    if (!params.password) {
        console.log('Lost password params, default password is used')
    }

    cipher({ inputUri, outputUri, password, decipherMode }, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (params.replace) {
                fs.unlink(inputUri, (err) => {
                  if (err) throw err;
                  console.log('Replace old file');
                })
            }
            console.log(`${decipherMode? 'Deciper' : 'Cipher'} done!`);
        }
    });
};