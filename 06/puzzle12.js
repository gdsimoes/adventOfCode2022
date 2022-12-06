const fs = require("fs");
const input = fs.readFileSync("input", "utf-8");

const markerLength = 14;
let answer;
for (let i = 0; i < input.length - markerLength; i++) {
    // Check if there are duplicates
    const s = new Set(input.slice(i, i + markerLength));

    if (s.size === markerLength) {
        answer = i + markerLength;
        break;
    }
}

console.log(answer);
