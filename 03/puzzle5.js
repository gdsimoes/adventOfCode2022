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
const letters = new Array(52 + 1);
for (const line of lines) {
    letters.fill(false);

    for (let i = 0; i < line.length / 2; i++) {
        const firstPriority = priority(line[i].codePointAt(0));
        const secondPriority = priority(line[line.length / 2 + i].codePointAt(0));

        if (letters[firstPriority] === 2) {
            sum += firstPriority;
            break;
        } else {
            letters[firstPriority] = 1;
        }

        if (letters[secondPriority] === 1) {
            sum += secondPriority;
            break;
        } else {
            letters[secondPriority] = 2;
        }
    }
}

console.log(sum);
