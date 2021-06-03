const assert = require('assert');
const { promisify } = require('util');
const fs = require('fs');
const abc = require('../index');

const readFile = promisify(fs.readFile);

let originalFile;

describe('Transpose down suit test', function () {
  this.beforeAll(async () => {
    originalFile = await readFile('./test/abc/cooleys2up.abc', 'utf-8');
  });

  it('Transpose 0 semitone down', async () => {
    const transposed = abc.down(originalFile, 0);
    assert.deepStrictEqual(originalFile, String(transposed));
  });

  it('Transpose 1 semitone down', async () => {
    const testFile = await readFile('./test/abc/cooleys1up.abc', 'utf-8');
    const transposed1File = await readFile('./test/abc/cooleys.abc', 'utf-8');
    const transposed = abc.down(testFile, 1);
    assert.deepStrictEqual(transposed1File, String(transposed));
  });

  it('Transpose 2 semitones down', async () => {
    const transposed1File = await readFile('./test/abc/cooleys.abc', 'utf-8');
    const transposed = abc.down(originalFile, 2);
    assert.deepStrictEqual(transposed1File, String(transposed));
  });

  it('Transpose 12 semitones down', async () => {
    const testFile = await readFile('./test/abc/test12up.abc', 'utf-8');
    const transposed7File = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed = abc.down(testFile, 12);
    assert.deepStrictEqual(transposed7File, String(transposed));
  });

  it('Transpose 24 semitones down', async () => {
    const testFile = await readFile('./test/abc/test24up.abc', 'utf-8');
    const transposed8File = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed = abc.down(testFile, 24);
    assert.deepStrictEqual(transposed8File, String(transposed));
  });

  it('Transpose 12 semitones down using different Keys', async () => {
    const testFile = await readFile('./test/abc/test_key12up.abc', 'utf-8');
    const transposed12File = await readFile('./test/abc/test_key.abc', 'utf-8');
    const transposed = abc.down(testFile, 12);
    assert.deepStrictEqual(transposed12File, String(transposed));
  });
});
