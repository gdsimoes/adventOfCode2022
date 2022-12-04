const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

let total = 0;
for (const line of lines) {
    // Last line is empty
    if (line === "") break;

    const ranges = line.split(",");
    const [a1, b1] = ranges[0].split("-").map((x) => Number(x));
    const [a2, b2] = ranges[1].split("-").map((x) => Number(x));

    // Direct approach
    // if (a1 < a2) {
    //     if (b2 <= b1) total++;
    // } else if (a2 < a1) {
    //     if (b1 <= b2) total++;
    // } else {
    //     total++;
    // }

    // Cool trick
    if ((a1 - a2) * (b1 - b2) <= 0) {
        total++;
    }
}

console.log(total);
