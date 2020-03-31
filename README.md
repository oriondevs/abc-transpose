# abc-transpose

A simple lib to shift music tone (up or down) using the **abc notation**. If you do not know the abc notation, please start reading this [link](https://abcnotation.com/examples).

## Installation

Installation uses the npm package manager. Just type the following command after installing npm.

```$ npm install abc-transpose```


## Usage

`up(abc: string, transpose: int)`: Transpose up abc notes, changing the key and notes. `transpose` indicates the number of tones that is transposed. For example: Cmajor to Dmajor = 1, Emajor to Gmajor = 2.

`down(abc: string, transpose: int)`: Transpose down abc notes, changing the key and notes. `transpose` indicates the number of tones that is transposed. For example: Bmajor to Cmajor = 1, Gmajor to Emajor = 2.

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

* 1.0.2 - Fix absent newline into abc/note field.
* 1.0.1 - added up and down functions.
* 1.0.0 - initial version.

## Roadmap

* Typescript support (?)

## License

abc-transpose is available under the MIT license.


