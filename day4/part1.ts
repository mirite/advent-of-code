import fs from "node:fs";
const data = fs.readFileSync("day4-data.txt").toString();
function parseGrid(input: string) {
	const grid: string[][] = [];
	let y = 0;
	for (let i = 0; i < input.length; i++) {
		if (!grid[y]) grid[y] = [];
		if (input[i] === "\n") {
			y++;
		} else {
			grid[y].push(input[i]);
		}
	}
	return grid;
}

const target = ["X", "M", "A", "S"];
const deltas = [1, 0, -1] as const;
type Delta = typeof deltas[number];
function findWords(grid: string[][], x: number, y: number, dx: Delta, dy: Delta, index = 0) {
	if (index === target.length) {
		console.log("Match!");
		return true;
	}
	if (!grid[y] || !grid[y][x] || target[index] !== grid[y][x]) {
		return false;
	}
	return findWords(grid, x + dx, y + dy, dx, dy, index + 1);

}

function findFromSquare(grid: string[][], x: number, y: number) {
	let sum = 0;
	for (const dy of deltas) {
		for (const dx of deltas) {
			if (dx === 0 && dy === 0) continue;
			if (findWords(grid, x, y, dx, dy)) {
				sum++;
			}
		}
	}
	return sum;
}
const parsedGrid = parseGrid(data);
let sum = 0;
for (let y = 0; y < parsedGrid.length; y++) {
	for (let x = 0; x < parsedGrid[y].length; x++) {
		sum += findFromSquare(parsedGrid, x, y);
	}
}
console.log(`${sum} found in ${parsedGrid[0].length}x${parsedGrid.length}`);
