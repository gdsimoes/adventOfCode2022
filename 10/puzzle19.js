const fs = require("fs");
const instructions = fs.readFileSync("input", "utf-8").split("\n");

const firstCycle = 20;
const lastCycle = 220;
const incr = 40;

let x = 1;
let cycles = 0;
let goal = firstCycle;
let strength = 0;
for (const instruction of instructions) {
    const [type, deltaStr] = instruction.split(" ");

    if (type === "noop") {
        cycles += 1;
    } else {
        cycles += 2;
    }

    // Check if goal is met
    if (cycles >= goal) {
        strength += goal * x;
        // console.log(goal, x, cycles * x);
        if (goal === 220) {
            break;
        } else {
            goal += incr;
        }
    }

    if (type === "addx") {
        x += Number(deltaStr);
    }
}

console.log(strength);
