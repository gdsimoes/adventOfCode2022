const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

function priority(letterCode) {
    const a = "a".codePointAt(0);
    const A = "A".codePointAt(0);
    const Z = "Z".codePointAt(0);

    if (letterCode <= Z) {
        return letterCode - A + 27;
    } else {
        return letterCode - a + 1;
    }
}

let sum = 0;

for (let i = 0; i < lines.length && lines[i] !== ""; i += 3) {
    const a = new Set(lines[i]);
    const b = new Set(lines[i + 1]);
    const c = new Set(lines[i + 2]);

    for (const char of a) {
        if (b.has(char) && c.has(char)) {
            sum += priority(char.codePointAt(0));
        }
    }
}

console.log(sum);
