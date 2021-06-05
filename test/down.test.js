const assert = require('assert');
const { promisify } = require('util');
const fs = require('fs');
const abc = require('../index');

const readFile = promisify(fs.readFile);

let originalFile;

describe('Transpose down suit test', function () {
  this.beforeAll(async () => {
    originalFile = await readFile('./test/abc/cooleys2.abc', 'utf-8');
  });

  it('Transpose 1 down', async () => {
    const transposed1File = await readFile('./test/abc/cooleys1.abc', 'utf-8');
    const transposed = abc.down(originalFile, 1);
    assert.deepStrictEqual(transposed1File, String(transposed));
  });

  it('Transpose 2 down', async () => {
    const transposed1File = await readFile('./test/abc/cooleys.abc', 'utf-8');
    const transposed = abc.down(originalFile, 2);
    assert.deepStrictEqual(transposed1File, String(transposed));
  });

  it('Transpose 7 down', async () => {
    const testFile = await readFile('./test/abc/test7up.abc', 'utf-8');
    const transposed7File = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed = abc.down(testFile, 7);
    assert.deepStrictEqual(transposed7File, String(transposed));
  });

  it('Transpose 14 down', async () => {
    const testFile = await readFile('./test/abc/test14up.abc', 'utf-8');
    const transposed8File = await readFile('./test/abc/test.abc', 'utf-8');
    const transposed = abc.down(testFile, 14);
    assert.deepStrictEqual(transposed8File, String(transposed));
  });
});
