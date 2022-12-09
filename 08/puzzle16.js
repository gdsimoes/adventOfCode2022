const fs = require("fs");
const lines = fs.readFileSync("input", "utf-8").split("\n");

// Populate tree matrix
const trees = [];
for (const line of lines) {
    // We can leave the digits as characters, but it's better to change to numbers
    trees.push(line.split("").map((x) => Number(x)));
}

// Last line is empty
trees.pop();

const rowCount = trees.length;
const colCount = trees[0].length;

function scenicScore(i, j) {
    const curr = trees[i][j];
    let score = 1;
    let top, right, left, bottom;

    for (top = j - 1; top >= 0; top--) {
        if (trees[i][top] >= curr) {
            top--;
            break;
        }
    }
    score *= j - top - 1;

    for (right = i + 1; right < colCount; right++) {
        if (trees[right][j] >= curr) {
            right++;
            break;
        }
    }
    score *= right - 1 - i;

    for (bottom = j + 1; bottom < rowCount; bottom++) {
        if (trees[i][bottom] >= curr) {
            bottom++;
            break;
        }
    }
    score *= bottom - 1 - j;

    for (left = i - 1; left >= 0; left--) {
        if (trees[left][j] >= curr) {
            left--;
            break;
        }
    }
    score *= i - left - 1;

    return score;
}

let answer = 0;
for (let i = 1; i < rowCount - 1; i++) {
    for (let j = 1; j < colCount; j++) {
        const curr = scenicScore(i, j);
        if (curr > answer) {
            answer = curr;
        }
    }
}

console.log(answer);
