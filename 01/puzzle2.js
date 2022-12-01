const fs = require("fs");

const lines = fs.readFileSync("input", "utf-8").split("\n");

let totalCaloriesArr = [];
let curr = 0;

for (const line of lines) {
    if (line === "") {
        totalCaloriesArr.push(curr);
        curr = 0;
    } else {
        curr += Number(line);
    }
}

totalCaloriesArr.sort((a, b) => b - a);

console.log(totalCaloriesArr[0] + totalCaloriesArr[1] + totalCaloriesArr[2]);
