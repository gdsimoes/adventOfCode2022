const fs = require("fs");
const commands = fs.readFileSync("input", "utf-8").split("\n");

// Last line is empty
commands.pop();

const rope = new Array(10);
for (let i = 0; i < 10; i++) {
    rope[i] = { x: 0, y: 0 };
}

const H = rope[0];
const T = rope[9];
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

        // Even though H can only move vertically or horizontally the
        // other knots can move diagonally and I had to account for that.
        for (let j = 0; j < 9; j++) {
            const dx = Math.abs(rope[j].x - rope[j + 1].x);
            const dy = Math.abs(rope[j].y - rope[j + 1].y);
            const avgX = (rope[j + 1].x + rope[j].x) / 2;
            const avgY = (rope[j + 1].y + rope[j].y) / 2;

            if (dx === 2) {
                if (dy === 2) {
                    rope[j + 1].x = avgX;
                    rope[j + 1].y = avgY;
                } else if (dy === 1) {
                    rope[j + 1].x = avgX;
                    rope[j + 1].y = rope[j].y;
                } else {
                    rope[j + 1].x = avgX;
                }
            } else if (dy === 2) {
                if (dx === 2) {
                    rope[j + 1].x = avgX;
                    rope[j + 1].y = avgY;
                } else if (dx === 1) {
                    rope[j + 1].x = rope[j].x;
                    rope[j + 1].y = avgY;
                } else {
                    rope[j + 1].y = avgY;
                }
            }
        }

        updateTrack(T);
    }
}

let answer = 0;
for (const x of xTrack.values()) {
    answer += x.size;
}

console.log(answer);
