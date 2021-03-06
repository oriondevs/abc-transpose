const header = /^[a-zA-Z]:\s*\w/;
const comment = /^%/;
const continuation = /\+:/;
const key = /K:\s*\w/;

const clef = [
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B',
];

const notes = [
  ...clef,
  'c',
  'd',
  'e',
  'f',
  'g',
  'a',
  'b',
];

const keyTranspose = (line, method) => {
  let lineOut = '';
  const keyPart = line.split('K:')[1];
  for (let l = 0; l < keyPart.length; l++) {
    if (keyPart[l] === ' ') {
      lineOut += keyPart[l];
    } else {
      if (clef.indexOf(keyPart[l]) >= 0) {
        if (clef.indexOf(keyPart[l]) === clef.length - 1 && method > 0) lineOut += 'C';
        else if (clef.indexOf(keyPart[l]) === 0 && method < 0) lineOut += 'B';
        else lineOut += clef[clef.indexOf(keyPart[l]) + method];
      }
      lineOut += keyPart.substring(l + 1);
      break;
    }
  }
  return `K:${lineOut}`;
};

const tuneBodyTranspose = (line, method) => {
  let lineOut = '';
  for (let l = 0; l < line.length; l++) {
    if (notes.indexOf(line[l]) >= 0) {
      // method up
      if (method > 0) {
        if (line[l] === 'B' && line[l + 1] === ',') {
          lineOut += 'C';
          l++;
        } else if (line[l] === 'b') {
          lineOut += 'c\'';
        } else {
          lineOut += notes[notes.indexOf(line[l]) + method];
        }
        // method down
      } else {
        if (line[l] === 'c' && line[l + 1] === '\'') {
          lineOut += 'b';
          l++;
        } else if (line[l] === 'C') {
          lineOut += 'B,';
        } else {
          lineOut += notes[notes.indexOf(line[l]) + method];
        }
      }
    } else {
      // Verify if symbol is a % and ignore all the rest
      if (line[l] === '%') {
        lineOut += line.substring(l);
        break;
      }
      // verify if symbol is a !decoration!
      if (line[l] === '!') {
        lineOut += line[l];
        l++;
        while (line[l] !== '!') {
          lineOut += line[l];
          l++;
        }
      }
      // Verify if symbol is a [r: remark]
      if (line[l] === '[') {
        // If is [r ... is a remark, else is a chord
        if (line[l + 1] === 'r') {
          while (line[l] !== ']') {
            lineOut += line[l];
            l++;
          }
        }
      }
      lineOut += line[l];
    }
  }
  return lineOut;
};

const transposeTone = (abc, transpose, method) => {
  let abcList = abc.split(/\r\n|\n/);

  for (let x = 0; x < transpose; x++) {
    const abcListTransposed = abcList.map((line) => {
      if (header.test(line)) {
        if (key.test(line)) {
          return keyTranspose(line, method);
        }
        return line;
      }
      if (comment.test(line)) {
        return line;
      }
      if (continuation.test(line)) {
        return line;
      }
      return tuneBodyTranspose(line, method);
    });
    abcList = abcListTransposed;
  }
  return abcList.join('\n');
};

const up = (abc, transpose = 1) => transposeTone(abc, transpose, 1);

const down = (abc, transpose = 1) => transposeTone(abc, transpose, -1);

module.exports = { up, down };
