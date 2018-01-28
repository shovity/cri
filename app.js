'use strict';

const path = require('path');
const cipher = require('./lib/cipher');
const docs = require('./docs');


module.exports = (params) => {

    const inputUri = params.inputUri;
    const decipherMode = inputUri.split('.').slice(-1)[0] === 'cri';

    const outputUri = decipherMode? `${params.outputUri || inputUri.replace('.cri', '')}`
        : `${params.outputUri || inputUri}.cri`;

    const password = params.password || 'tluafed-terces';

    if (!inputUri) {
        return console.log(`cri {filename} [-p password] [-o output]`);
    }

    cipher({ inputUri, outputUri, password, decipherMode }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${decipherMode? 'Deciper' : 'Cipher'} done!`);
        }
    });
};
