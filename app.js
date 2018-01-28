'use strict';

const path = require('path');
const cipher = require('./lib/cipher');



module.exports = (params) => {

    const inputUri = params.inputUri;
    const decipherMode = inputUri.split('.').slice(-1)[0] === 'cri';

    const outputUri = decipherMode? `${params.outputUri || inputUri.replace('.cri', '')}`
        : `${params.outputUri || inputUri}.cri`;

    const password = params.password || 'tluafed-terces';

    cipher({ inputUri, outputUri, password, decipherMode }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${decipherMode? 'Deciper' : 'Cipher'} done!`);
        }
    });
};
