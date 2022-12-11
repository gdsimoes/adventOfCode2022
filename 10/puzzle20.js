const fs = require("fs");
const instructions = fs.readFileSync("input", "utf-8").split("\n");

let x = 1;
let cycle = 0;
let answer = "";

function draw(cycle) {
    const position = cycle % 40;
    if (position === 0) {
        answer += "\n";
    }

    if (x - 1 <= position && position <= x + 1) {
        answer += "#";
    } else {
        answer += ".";
    }
}

for (const instruction of instructions) {
    const [type, incrStr] = instruction.split(" ");

    if (type === "noop") {
        draw(cycle);
        cycle++;
    } else {
        draw(cycle);
        cycle++;
        draw(cycle);
        cycle++;
        x += Number(incrStr);
    }
}

console.log(answer);
