const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

function isNumeral(char) {
    return "0" <= char && char <= "9";
}

let columnsIndex;
for (columnsIndex = 0; !isNumeral(lines[columnsIndex][1]); columnsIndex++);

const columns = new Array(10);
for (let i = 1; i < 10; i++) {
    columns[i] = [];
    for (let j = columnsIndex - 1; j >= 0 && lines[j][1 + 4 * (i - 1)] !== " "; j--) {
        columns[i].push(lines[j][1 + 4 * (i - 1)]);
    }
}

// Move crates
for (let i = columnsIndex + 2; lines[i] !== ""; i++) {
    const words = lines[i].split(" ");
    const n = Number(words[1]);
    const from = Number(words[3]);
    const to = Number(words[5]);

    for (let j = 0; j < n; j++) {
        columns[to].push(columns[from].pop());
    }
}

let answer = "";
for (let i = 1; i < 10; i++) {
    answer += columns[i].pop();
}

console.log(answer);
