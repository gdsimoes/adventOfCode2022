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

// Arrays with information on tallest trees
const trackRow = new Array(rowCount);
const trackCol = new Array(colCount);

// Populate tracks
for (let i = 1; i < rowCount - 1; i++) {
    const digits = new Array(10).fill(0);
    let max = 0;
    for (let j = 1; j < colCount; j++) {
        digits[trees[i][j]]++;
        if (max < trees[i][j]) {
            max = trees[i][j];
        }
    }
    trackRow[i] = { leftMax: trees[i][0], rightMax: max, rightDigits: digits };
}

for (let j = 1; j < colCount - 1; j++) {
    const digits = new Array(10).fill(0);
    let max = 0;
    for (i = 1; i < rowCount; i++) {
        if (trees[i][j] === undefined) {
            // console.log("Hi", i, j);
        }
        digits[trees[i][j]]++;
        if (max < trees[i][j]) {
            max = trees[i][j];
        }
    }
    trackCol[j] = { topMax: trees[0][j], bottomMax: max, bottomDigits: digits };
}

// Count visible trees
let visibleCount = 2 * rowCount + 2 * colCount - 4;
for (let i = 1; i < rowCount - 1; i++) {
    for (let j = 1; j < colCount - 1; j++) {
        const curr = trees[i][j];

        // Remove from tracks
        trackRow[i].rightDigits[curr]--;
        trackCol[j].bottomDigits[curr]--;

        // Update rightMax and bottomMax, if necessary
        if (trackRow[i].rightDigits[trackRow[i].rightMax] === 0) {
            for (let k = 9; k >= 0; k--) {
                if (trackRow[i].rightDigits[k] > 0) {
                    trackRow[i].rightMax = k;
                    break;
                }
            }
        }

        if (trackCol[j].bottomDigits[trackCol[j].bottomMax] === 0) {
            for (let k = 9; k >= 0; k--) {
                if (trackCol[j].bottomDigits[k] > 0) {
                    trackCol[j].bottomMax = k;
                    break;
                }
            }
        }

        // Check if visible
        if (curr > Math.min(trackRow[i].leftMax, trackRow[i].rightMax, trackCol[j].topMax, trackCol[j].bottomMax)) {
            visibleCount++;
        }

        // Update topMax and bottomMax, if necessary
        if (curr > trackRow[i].leftMax) {
            trackRow[i].leftMax = curr;
        }

        if (curr > trackCol[j].topMax) {
            trackCol[j].topMax = curr;
        }
    }
}

console.log(visibleCount);
