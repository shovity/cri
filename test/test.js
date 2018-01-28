const cipher = require('../lib/cipher');
const decipher = require('../lib/decipher');

// cipher({ pathFileIn: 'test.txt', pathFileOut: 'test.cipher.txt' }, () => {
//     console.log('test cipher done');
//
//     decipher({ pathFileIn: 'test.cipher.txt', pathFileOut: 'test.decipher.txt' }, () => {
//         console.log('test deciper done');
//     })
// })


cipher({ pathFileIn: 'a', pathFileOut: 'a' }, () => {
    console.log('done')
})
