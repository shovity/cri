## Encrypt and decrypt file with Nodejs

[![NPM version](https://badge.fury.io/js/cri.svg)](https://www.npmjs.com/package/cri)
![Downloads](https://img.shields.io/npm/dm/cri.svg?style=flat)

### Installation
```sh
# Get the latest stable release of rsq
$ npm install cri -g
  or
$ yarn add cri -g
```

### Usage Example

```sh
$ cri file.mp4
  output: file.mp4.cri (encrypted)

$ cri file.mp4.cri
  output: file.mp4 (decrypted)

# encrypt/decrypt with your password
$ cri file.mp4 -p [password]

# encrypt/decrypt with your output
$ cri file.mp4 -o [output]

# encrypt/decrypt and remove old file
$ cri file.mp4 -r

# cri without options to help
$ cri
```