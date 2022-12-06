const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");

let answer;
for (let i = 0; i < input.length - 4; i++) {
    // Check if there are duplicates
    const s = new Set(input.slice(i, i + 4));

    if (s.size === 4) {
        answer = i + 4;
        break;
    }
}

console.log(answer);
