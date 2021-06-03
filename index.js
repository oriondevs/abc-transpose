const header = /^[a-zA-Z]:\s*\w/;
const comment = /^%/;
const continuation = /\+:/;
const key = /^K:\s*\w*/;

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

const addSharpOrFlat = (line, l, method) => {
  let accident;
  let reverseAccident;
  let borderNotes = [];
  if (method > 0) {
    accident = '^';
    reverseAccident = '_';
    borderNotes = ['E', 'e', 'B'];
  } else {
    accident = '_';
    reverseAccident = '^';
    borderNotes = ['F', 'f', 'c'];
  }

  if (line[l + 1] === reverseAccident) {
    return {
      lineOut: line[l],
      l: l + 1,
    };
  }
  if (line[l + 1] === accident) {
    return {
      lineOut: notes[notes.indexOf(line[l]) + method],
      l: l + 1,
    };
  }
  if (line[l] === borderNotes[0]
    || line[l] === borderNotes[1]
    || line[l] === borderNotes[2]) {
    return {
      lineOut: notes[notes.indexOf(line[l]) + method],
      l,
    };
  }
  return {
    lineOut: `${line[l]}${accident}`,
    l,
  };
};

const keyTranspose = (line, method) => {
  const keyPattern = /K:\s*([abcdefgABCDEFG][b#]?)/;
  const clefAndTranspositionPattern = /K:\s*clef=|staffline=|octave=|score=|sound=|shift=|instrument=|clef-c/;

  if (clefAndTranspositionPattern.test(line)) {
    return line;
  }
  if (keyPattern.test(line)) {
    return line.replace(keyPattern, (match, token) => {
      const transformedTokenInLine = token.replace('#', '^').replace('b', '_');
      let lineOut;
      if (transformedTokenInLine[0] === 'C' && method < 0) {
        lineOut = 'B';
      } else {
        lineOut = addSharpOrFlat(transformedTokenInLine, 0, method).lineOut;
      }
      const transformedLineOutInKey = lineOut.toUpperCase().replace('^', '#').replace('_', 'b');
      return match.replace(token, transformedLineOutInKey);
    });
  }
  return line;
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
          const sharp = addSharpOrFlat(line, l, method);
          lineOut += sharp.lineOut;
          l = sharp.l;
        }
        // method down
      } else {
        if (line[l] === 'c' && line[l + 1] === '\'') {
          lineOut += 'b';
          l++;
        } else if (line[l] === 'C' && line[l + 1] !== '^') {
          lineOut += 'B,';
        } else {
          const sharp = addSharpOrFlat(line, l, method);
          lineOut += sharp.lineOut;
          l = sharp.l;
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
