[![Build Status](https://travis-ci.com/oriondevs/abc-transpose.svg?branch=master)](https://travis-ci.com/oriondevs/abc-transpose)
[![Coverage Status](https://coveralls.io/repos/github/oriondevs/abc-transpose/badge.svg?branch=master)](https://coveralls.io/github/oriondevs/abc-transpose?branch=master)
[![Coverage Status](https://img.shields.io/codecov/c/github/oriondevs/abc-transpose/master.svg)](https://codecov.io/gh/oriondevs/abc-transpose?branch=master)

# abc-transpose

A simple lib to shift music tone (up or down) using the **abc notation**. If you do not know the abc notation, please start reading this [link](https://abcnotation.com/examples).

## Installation

Installation uses the npm package manager. Just type the following command after installing npm.

```$ npm install abc-transpose```


## Usage

`up(abc: string, transpose: int)`: Transpose up abc notes, changing the key and notes. `transpose` indicates the number of tones that is transposed. For example: Cmajor to Dmajor = 1, Emajor to Gmajor = 2.

`down(abc: string, transpose: int)`: Transpose down abc notes, changing the key and notes. `transpose` indicates the number of tones that is transposed. For example: Cmajor to Bmajor = 1, Gmajor to Emajor = 2.

## Examples

Read an abc file (node-js):
```js
const abc = require("abc-transpose")

const fs = require("fs")

fs.readFile('/tmp/cooleys.abc', (err, data) => {
    if (!err) {
        // Transpose data to next tone (1 up)
        const onetone = abc.up(data)
        console.log(onetone)

        // Transpose data to 2 tones up
        const twotone= abc.up(data, 2)
        console.log(twotone)

        // Transpose data 1 tone down
        const onedown = abc.down(data)
        console.log(onedown)

        // Transpose data 7 tones down
        const sevendown = abc.down(data, 7)
        console.log(sevendown)
    }
})
```
## Changelog

* 1.0.5 - Refactore and add support comments(% ....), remark( [r: this is a remark]), decoration (!trill!) and field continuation (+: ...).
* 1.0.4 - Refactore and add support to to windows-unix linestyle.
* 1.0.3 - Remove console.log('Ok') and ignore lines with %.
* 1.0.2 - Fix absent newline into abc/note field.
* 1.0.1 - added up and down functions.
* 1.0.0 - initial version (skeleton, please do not use it).

## Roadmap

* Typescript support (?)
* Add tests
* Add CI/CD (Done)
* Minify index.js (?)

## License

abc-transpose is available under the MIT license.
