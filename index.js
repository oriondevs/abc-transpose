const transposeTone = function(abc, transpose, method) {
    const mapup = {
        C: "D",
        D: "E",
        E: "F",
        F: "G",
        G: "A",
        A: "B",
        B: "c",
        c: "d",
        d: "e",
        e: "f",
        f: "g",
        g: "a",
        a: "b",
        b: "c'"
    };
    const mapdown = {
        C: "B,",
        D: "C",
        E: "D",
        F: "E",
        G: "F",
        A: "G",
        B: "A",
        c: "B",
        d: "c",
        e: "d",
        f: "e",
        g: "f",
        a: "g",
        b: "a"
    };

    let abcout;
    const group = /[a-zA-Z]:\s*\w/;
    const key = /K:\s*(\w)\s*(\w*)/;

    if (method === "up") map = mapup;
    else map = mapdown;

    for (let qtd = 0; qtd < transpose; qtd++) {
        abcout = "";
        const abcencoded = encodeURI(abc);
        const abcList = abcencoded.split("%0D%0A");
        for (let i = 0; i < abcList.length; i++) {
            const line = decodeURI(abcList[i]);
            if (group.test(line)) {
                const k = key.exec(line);
                if (k) {
                    if (method === "up") {
                        if (k[1] === "B") abcout += "K: C" + k[2] + "\r\n";
                        else abcout += "K: " + map[k[1]] + k[2] + "\r\n";
                    }
                    if (method === "down") {
                        if (k[1] === "C") abcout += "K: B" + k[2] + "\r\n";
                        else abcout += "K: " + map[k[1]] + k[2] + "\r\n";
                    }
                } else {
                    abcout += line + "\r\n";
                }
            } else {
                for (let c = 0; c < line.length; c++) {
                    if (map[line[c]]) {
                        if (method === "up") {
                            // Remove , if exists
                            if (line[c] === "B" && line[c + 1] === ",") {
                                console.log("OPA");
                                abcout += "C";
                                c += 1;
                            } else abcout += map[line[c]];
                        } else {
                            // Remove ' if exists
                            if (line[c] === "c" && line[c + 1] === "'") {
                                abcout += "b";
                                c += 1;
                            } else abcout += map[line[c]];
                        }
                    } else {
                        abcout += line[c];
                    }
                }
            }
        }
        abc = abcout;
    }
    return abc;
};

const up = function(abc, transpose = 1) {
    return transposeTone(abc, transpose, "up");
};

const down = function(abc, transpose = 1) {
    return transposeTone(abc, transpose, "down");
};

module.exports = { up, down };