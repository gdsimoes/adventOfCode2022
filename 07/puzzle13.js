const fs = require("fs");
const lines = fs.readFileSync("input", "utf-8").split("\n");

let answer = 0;

class Dir {
    constructor(parent, name) {
        this.parent = parent;
        this.name = name;
        this.fileList = [];
    }

    // This is an ugly solution, but I have a day job, you know?
    get totalSize() {
        const result = this.fileList.reduce((sum, currFile) => sum + currFile.totalSize, 0);
        if (result <= 100000) {
            answer += result;
        }
        return result;
    }
}

class File {
    constructor(totalSize, name) {
        this.totalSize = totalSize;
        this.name = name;
    }
}

const root = new Dir(null, "/");

// Populate root
let currDir = root;
for (let i = 1; lines[i].length > 0; i++) {
    const line = lines[i];

    if (line[0] === "$") {
        if (line[2] === "c") {
            const name = line.slice(5);
            currDir = name === ".." ? currDir.parent : currDir.fileList.find((f) => f.name === name);
        }
    } else if (line[0] === "d") {
        const name = line.slice(4);
        currDir.fileList.push(new Dir(currDir, name));
    } else {
        const [sizeStr, name] = line.split(" ");
        const totalSize = Number(sizeStr);
        currDir.fileList.push(new File(totalSize, name));
    }
}

// Find answer
root.totalSize;
console.log(answer);
