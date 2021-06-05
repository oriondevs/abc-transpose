const header = /^[a-zA-Z]:\s*\w/;
const comment = /^%/;
const continuation = /^\+:/;

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

const addSharpOrFlat = (note, method) => {
  let borderNotes = [];
  let accident;
  if (method > 0) {
    accident = '^';
    borderNotes = ['E', 'e', 'B'];
  } else {
    accident = '_';
    borderNotes = ['F', 'f', 'c'];
  }
  if (note === borderNotes[0] || note === borderNotes[1] || note === borderNotes[2]) {
    return notes[notes.indexOf(note) + method];
  }
  return `${accident}${note}`;
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
        } else if (line[l] === 'b' && line[l + 1] !== '_') {
          lineOut += 'c\'';
        } else {
          lineOut += addSharpOrFlat(line[l], method);
        }
        // method down
      } else {
        if (line[l] === 'c' && line[l + 1] === '\'') {
          lineOut += 'b';
          l++;
        } else if (line[l] === 'C' && line[l - 1] !== '^') {
          lineOut += 'B,';
        } else {
          lineOut += addSharpOrFlat(line[l], method);
        }
      }
    } else {
      // Verify if symbol is an accidental
      if (line[l] === '^' || line[l] === '_') {
        let accident;
        if (method > 0) {
          accident = '^';
        } else {
          accident = '_';
        }

        if (line[l] === accident) {
          lineOut += notes[notes.indexOf(line[l + 1]) + method];
        } else {
          lineOut += line[l + 1];
        }
        l++;
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
  }
  return lineOut;
};

const transposeTone = (abc, transpose, method) => {
  let abcList = abc.split(/\r\n|\n/);

  for (let x = 0; x < transpose; x++) {
    const abcListTransposed = abcList.map((line) => {
      if (header.test(line)) {
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
