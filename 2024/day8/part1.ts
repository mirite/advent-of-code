import fs from "node:fs";

type Node = { frequency: string; x: number; y: number };
type Grid = (null | Node[])[][];

function readGrid(raw: string): Grid {
	let output: Grid = [];
	let x = 0;
	let y = 0;
	for (let i = 0; i < raw.length; i++) {
		if (raw[i] === "\n") {
			y++;
			x = 0;
		} else {
			let content: null | Node[] = null;
			if (raw[i] !== ".") {
				content = [{ x, y, frequency: raw[i] }];
			}
			if (!output[x]) {
				output.push([]);
			}
			output[x][y] = content;
			x++;
		}
	}
	return output;
}

function getNodes(grid: Grid): Node[] {
	const results: Node[] = [];
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			const current = grid[x][y];
			if (current) results.push(...current);
		}
	}
	return results;
}

function printGrid(grid: Grid): void {
	let lines: string[] = [];
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid.length; y++) {
			if (!lines[y]) {
				lines.push("");
			}
			const cell = grid[x][y];
			lines[y] += cell ? cell[0].frequency : "*";
		}
	}
	console.log(lines.join("\n"));
}
function getNodesInLine(grid: Grid, node: Node): Node[] {}

function getDistanceBetweenNodes(nodeA: Node, nodeB: Node): number {}

(function () {
	const raw = fs.readFileSync("sample-data.txt").toString();
	const grid = readGrid(raw);
	printGrid(grid);
})();
