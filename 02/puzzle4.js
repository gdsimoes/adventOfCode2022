const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

let score = 0;

for (const line of lines) {
    if (line === "") continue;

    const opponent = line.codePointAt(0) - "A".codePointAt(0);
    const result = line.codePointAt(2) - "X".codePointAt(0);
    const you = (opponent + (result - 1) + 3) % 3;

    // 0 if you lost, 3 if the round was a draw, and 6 if you won
    score += result * 3;

    // 1 for Rock, 2 for Paper, and 3 for Scissors
    score += you + 1;
}

console.log(score);
