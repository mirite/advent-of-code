import fs from "node:fs";

type Node = { frequency: string; x: number; y: number };
type Grid = (null | Node[])[][];

function readGrid(raw: string): Grid {}

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

function getNodesInLine(grid: Grid, node: Node): Node[] {}

function getDistanceBetweenNodes(nodeA: Node, nodeB: Node): number {}

(function () {
	const raw = fs.readFileSync("sample-data.txt");
	const grid = readGrid(raw);
})();
