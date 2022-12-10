const fs = require("fs");
const commands = fs.readFileSync("input", "utf-8").split("\n");

// Last line is empty
commands.pop();

const H = { x: 0, y: 0 };
const T = { x: 0, y: 0 };
const delta = { x: 0, y: 0 };

function updateTrack(T) {
    xTrack.set(T.x, xTrack.has(T.x) ? xTrack.get(T.x).add(T.y) : new Set([T.y]));
}

const xTrack = new Map();
updateTrack(T);

for (const command of commands) {
    const [direction, steps] = [command[0], Number(command.slice(2))];

    if (direction === "U") {
        delta.x = 0;
        delta.y = 1;
    } else if (direction === "R") {
        delta.x = 1;
        delta.y = 0;
    } else if (direction === "D") {
        delta.x = 0;
        delta.y = -1;
    } else {
        delta.x = -1;
        delta.y = 0;
    }

    for (let i = 0; i < steps; i++) {
        H.x += delta.x;
        H.y += delta.y;

        if (Math.abs(H.x - T.x) === 2) {
            if (Math.abs(H.y - T.y) === 1) {
                T.x = (T.x + H.x) / 2;
                T.y = H.y;
            } else {
                T.x = (T.x + H.x) / 2;
            }
            updateTrack(T);
        } else if (Math.abs(H.y - T.y) === 2) {
            if (Math.abs(H.x - T.x) === 1) {
                T.x = H.x;
                T.y = (T.y + H.y) / 2;
            } else {
                T.y = (T.y + H.y) / 2;
            }
            updateTrack(T);
        }
    }
}

let answer = 0;
for (const x of xTrack.values()) {
    answer += x.size;
}

console.log(answer);
