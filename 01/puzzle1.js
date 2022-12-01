const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

let max = -Infinity;
let curr = 0;

for (const line of lines) {
    if (line === "") {
        max = curr > max ? curr : max;
        curr = 0;
    } else {
        curr += Number(line);
    }
}

console.log(max);
