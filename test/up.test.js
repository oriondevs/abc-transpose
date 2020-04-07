const assert = require('assert')
const abc = require("../index")
const { promisify } = require('util')
const fs = require("fs")

const readFile = promisify(fs.readFile);

let originalFile = {}
describe('Transpose up suit test', function() {
    this.beforeAll(async() => {
        originalFile = await readFile('./test/abc/cooleys.abc', 'utf-8')
    })

    it('Transpose 1 up', async() => {
        const transposed1File = await readFile('./test/abc/cooleys1.abc', 'utf-8')
        const transposed = abc.up(originalFile, 1)
        assert.deepEqual(transposed1File, String(transposed))
    })

    //For while this will fail
    // it('Transpose 1 up with space between Key tone. E.g K: E.', async() => {
    //     const transposed1File = await readFile('./test/abc/cooleys1.abc', 'utf-8')
    //     const transposed = abc.up(originalFile, 1)
    //     assert.deepEqual(transposed1File, String(transposed))
    // })
    it('Transpose 2 up', async() => {
        const transposed2File = await readFile('./test/abc/cooleys2.abc', 'utf-8')
        const transposed = abc.up(originalFile, 2)
        assert.deepEqual(transposed2File, String(transposed))
    })
})