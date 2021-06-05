[![Build Status](https://travis-ci.com/oriondevs/abc-transpose.svg?branch=master)](https://travis-ci.com/oriondevs/abc-transpose)
[![Coverage Status](https://coveralls.io/repos/github/oriondevs/abc-transpose/badge.svg?branch=master)](https://coveralls.io/github/oriondevs/abc-transpose?branch=master)
[![Coverage Status](https://img.shields.io/codecov/c/github/oriondevs/abc-transpose/master.svg)](https://codecov.io/gh/oriondevs/abc-transpose?branch=master)

# abc-transpose

A simple lib to shift music notes (up or down) using the **abc notation**. If you do not know the abc notation, please start reading this [link](https://abcnotation.com/examples).

## Installation

Installation uses the npm package manager. Just type the following command after installing npm.

```$ npm install abc-transpose```


## Usage

`up(abc: string, transpose: int)`: Transpose up abc notes, changing all notes. `transpose` indicates the number of semitones that is transposed. For example: C to D = 2 semitones, E to G = 3 semitones without change the Key.

`down(abc: string, transpose: int)`: Transpose down abc notes, changing all notes. `transpose` indicates the number of semitones that is transposed. For example: C to B = -1 semitone, G to E = -3 semitones without change the Key.

The table below shows the difference between 2 notes in semitones:

| NOTES | C | C#\|Db | D | D#\|Eb | E | F | F#\|Gb | G | G#\|Ab | A | A#\Bb | B | C |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| C | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 

E.g:
(up) C to C = 0 semitone

(up) C# to D# = | 3 - 1 | = 2 semitones

(up) F# to B = | 11 - 6 | = 5 semitones 

(down) B to A = | 11 - 9 | * -1 = -2 semitones

## Examples

Read an abc file (node-js):
```js
const abc = require("abc-transpose")

const fs = require("fs")

fs.readFile('/tmp/cooleys.abc', (err, data) => {
    if (!err) {
        // Transpose data to next semitone (1 up)
        const onetone = abc.up(data)
        console.log(onetone)

        // Transpose data to 2 semitones up
        const twotone= abc.up(data, 2)
        console.log(twotone)

        // Transpose data 1 semitone down
        const onedown = abc.down(data)
        console.log(onedown)

        // Transpose data 7 semitones down
        const sevendown = abc.down(data, 7)
        console.log(sevendown)
    }
})
```

## Changelog

* 1.0.6 - Add semitones support (^, _).
Breaking changes:
    - The transpose now works with semitone (half tone).
* 1.0.5 - Refactore and add support comments(% ....), remark( [r: this is a remark]), decoration (!trill!) and field continuation (+: ...).
* 1.0.4 - Refactore and add support to to windows-unix linestyle.
* 1.0.3 - Remove console.log('Ok') and ignore lines with %.
* 1.0.2 - Fix absent newline into abc/note field.
* 1.0.1 - added up and down functions.
* 1.0.0 - initial version (skeleton, please do not use it).

## Roadmap

* Typescript support (?)
* Add tests (Done)
* Add CI/CD (Done)
* Minify index.js (?)

## License

`abc-transpose` is available under the MIT license.
