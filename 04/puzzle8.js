const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

let total = 0;
for (const line of lines) {
    // Last line is empty
    if (line === "") break;

    const ranges = line.split(",");
    const [a1, b1] = ranges[0].split("-").map((x) => Number(x));
    const [a2, b2] = ranges[1].split("-").map((x) => Number(x));

    // Cooler trick
    if ((b1 - a2) * (b2 - a1) >= 0) {
        total++;
    }
}

console.log(total);
