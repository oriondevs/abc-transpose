const assert = require('assert');
const { promisify } = require('util');
const fs = require('fs');
const abc = require('../index');

const readFile = promisify(fs.readFile);

let originalFile;

describe('Transpose up suit test', function () {
  this.beforeAll(async () => {
    originalFile = await readFile('./test/abc/cooleys.abc', 'utf-8');
  });

  it('Transpose 0 semitone up', async () => {
    const transposed = abc.up(originalFile, 0);
    assert.deepStrictEqual(originalFile, String(transposed));
  });

  it('Transpose 1 semitone up', async () => {
    const transposed1File = await readFile('./test/abc/cooleys1up.abc', 'utf-8');
    const transposed = abc.up(originalFile, 1);
    assert.deepStrictEqual(transposed1File, String(transposed));
  });

  it('Transpose 2 semitones up', async () => {
    const transposed2File = await readFile('./test/abc/cooleys2up.abc', 'utf-8');
    const transposed = abc.up(originalFile, 2);
    assert.deepStrictEqual(transposed2File, String(transposed));
  });

  it('Transpose 12 semitones up', async () => {
    const testFile = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed12File = await readFile('./test/abc/test12up.abc', 'utf-8');
    const transposed = abc.up(testFile, 12);
    assert.deepStrictEqual(transposed12File, String(transposed));
  });

  it('Transpose 24 semitones up', async () => {
    const testFile = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed24File = await readFile('./test/abc/test24up.abc', 'utf-8');
    const transposed = abc.up(testFile, 24);
    assert.deepStrictEqual(transposed24File, String(transposed));
  });

  it('Transpose 12 semitones up using different Keys', async () => {
    const testFile = await readFile('./test/abc/test_key.abc', 'utf-8');
    const transposed12File = await readFile('./test/abc/test_key12up.abc', 'utf-8');
    const transposed = abc.up(testFile, 12);
    assert.deepStrictEqual(transposed12File, String(transposed));
  });
});
