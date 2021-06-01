const transposeTone = (abc, transpose, method) => {
  let abcList = abc.split(/\r\n|\n/);
  const clefup = {
    C: 'D',
    D: 'E',
    E: 'F',
    F: 'G',
    G: 'A',
    A: 'B',
    B: 'C',
  };

  const clefdown = {
    C: 'B',
    D: 'C',
    E: 'D',
    F: 'E',
    G: 'F',
    A: 'G',
    B: 'A',
  };

  const mapup = {
    ...clefup,
    B: 'c',
    c: 'd',
    d: 'e',
    e: 'f',
    f: 'g',
    g: 'a',
    a: 'b',
    b: 'c\'',
  };

  const mapdown = {
    ...clefdown,
    C: 'B,',
    c: 'B',
    d: 'c',
    e: 'd',
    f: 'e',
    g: 'f',
    a: 'g',
    b: 'a',
  };

  const group = /[a-zA-Z]:\s*\w/;
  const staff = /%/;
  const key = /K:\s*\w/;
  let map;
  let clef;

  if (method === 'up') {
    map = mapup;
    clef = clefup;
  } else {
    map = mapdown;
    clef = clefdown;
  }

  for (let x = 0; x < transpose; x++) {
    const abcListTransposed = abcList.map((line) => {
      if (group.test(line)) {
        if (key.test(line)) {
          let lineOut = '';
          const keyPart = line.split('K:');
          for (let l = 0; l < keyPart[1].length; l++) {
            if (keyPart[1][l] === ' ') {
              lineOut += keyPart[1][l];
            } else {
              if (clef[keyPart[1][l]]) {
                lineOut += clef[keyPart[1][l]];
              }
              lineOut += keyPart[1].substring(l + 1);
              break;
            }
          }
          return `K:${lineOut}`;
        }
        return line;
      }
      if (staff.test(line)) {
        return line;
      }

      let lineOut = '';
      for (let l = 0; l < line.length; l++) {
        if (map[line[l]]) {
          if (method === 'up') {
            if (line[l] === 'B' && line[l + 1] === ',') {
              lineOut += 'C';
              l += 1;
            } else {
              lineOut += map[line[l]];
            }
          } else {
            // Method 'down'
            if (line[l] === 'c' && line[l + 1] === '\'') {
              lineOut += 'b';
              l += 1;
            } else {
              lineOut += map[line[l]];
            }
          }
        } else {
          lineOut += line[l];
        }
      }
      return lineOut;
    });
    abcList = abcListTransposed;
  }
  return abcList.join('\n');
};

const up = (abc, transpose = 1) => transposeTone(abc, transpose, 'up');

const down = (abc, transpose = 1) => transposeTone(abc, transpose, 'down');

module.exports = { up, down };
