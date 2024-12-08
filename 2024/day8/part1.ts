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

const vectors = [
	{ dx: -1, dy: 1 },
	{ dx: 0, dy: 1 },
	{ dx: 1, dy: 1 },
	{ dx: 1, dy: 0 },
	{ dx: 1, dy: -1 },
	{ dx: 0, dy: -1 },
	{ dx: -1, dy: -1 },
	{ dx: -1, dy: 0 },
];

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
				lines.push(`${y}` + (y < 10 ? " " : ""));
			}
			const cell = grid[x][y];
			lines[y] += (cell ? cell[0].frequency : "*") + " ";
		}
	}
	console.log("  0 1 2 3 4 5 6 7 8 9 1011\n" + lines.join("\n"));
}
function getNodesInLine(grid: Grid, xCoord: number, yCoord: number): Node[] {
	const width = grid.length;
	const height = grid[0].length;
	const output: Node[] = [];
	for (const vector of vectors) {
		// TODO: This needs to take into account that x,y could have nodes in line with it on opposite vectors.
		const nodesOnLine: Node[] = [];
		let x = xCoord + vector.dx;
		let y = yCoord + vector.dy;
		while (
			x + vector.dx > 0 &&
			x + vector.dx < width &&
			y + vector.dy > 0 &&
			y + vector.dy < height
		) {
			const current = grid[x][y];
			if (current) {
				for (const nodeInCell of current) {
					nodesOnLine.push(nodeInCell);
				}
			}
			x += vector.dx;
			y += vector.dy;
		}

		for (const nodeOnLine of nodesOnLine) {
		}
	}

	return output;
}

function getDistanceBetweenNodes(nodeA: Node, nodeB: Node): number {}

(function () {
	const raw = fs.readFileSync("sample-data.txt").toString();
	const grid = readGrid(raw);
	printGrid(grid);
	//const nodes = getNodes(grid);
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[0].length; y++) {
			const sameFrequencyNodes = getNodesInLine(grid, x, y);
			if (sameFrequencyNodes.length) {
				console.dir({ x, y, sameFrequencyNodes }, { depth: 3 });
			}
		}
	}
})();
