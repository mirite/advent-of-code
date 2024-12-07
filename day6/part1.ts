import fs from "node:fs";

const dataString = fs.readFileSync("sample-data.txt").toString();

const grid: boolean[][] = [];
let x = 0;
let y = 0;
let guardPosition: [number, number] = [-1, -1];
for (let i = 0; i < dataString.length; i++) {
	const current = dataString[i];
	if (current === "\n") {
		y++;
		x = 0;
	} else if (current) {
		if (!grid[y]) {
			grid.push([]);
		}
		if (current === "#") {
			grid[y][x] = true;
		} else if (current === "^") {
			grid[y][x] = false;
			guardPosition = [x, y];
		} else {
			grid[y][x] = false;
		}
		x++;
	}
}

console.log(grid);
console.log(guardPosition);
