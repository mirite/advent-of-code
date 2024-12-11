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
				lines.push(`${y}` + (y < 10 ? " " : ""));
			}
			const cell = grid[x][y];
			lines[y] += (cell ? cell[0].frequency : "*") + " ";
		}
	}
	console.log("  0 1 2 3 4 5 6 7 8 9 1011\n" + lines.join("\n"));
}

function groupNodesByFrequency<T extends Node>(
	nodesInLine: T[],
): Record<string, T[]> {
	const grouped: Record<string, T[]> = {};
	for (const node of nodesInLine) {
		if (!grouped[node.frequency]) {
			grouped[node.frequency] = [];
		}
		grouped[node.frequency].push(node);
	}
	return grouped;
}

function getAntiNodeLocations(
	node: Node,
	grouped: Record<string, Node[]>,
	width: number,
	height: number,
): [number, number][] {
	const { x, y, frequency } = node;
	const sameFrequency = grouped[frequency];

	const antiNodes: [number, number][] = [];
	for (const otherNode of sameFrequency) {
		const { x: x2, y: y2 } = otherNode;
		if (y2 === y && x2 === x) {
			continue;
		}
		const dy = y2 - y;
		const dx = x2 - x;

		let anX = x;
		let anY = y;
		while (true) {
			if (anX < 0 || anX >= width || anY < 0 || anY >= height) {
				break;
			}
			antiNodes.push([anX, anY]);
			anX -= dx;
			anY -= dy;
		}
	}
	return antiNodes;
}

function getUniques(antiNodes: [number, number][]): [number, number][] {
	let output: [number, number][] = [];
	outer: for (const node of antiNodes) {
		for (const existing of output) {
			if (existing[0] === node[0] && existing[1] === node[1]) continue outer;
		}
		output.push(node);
	}
	return output;
}
(function () {
	const raw = fs.readFileSync("data.txt").toString();
	const grid = readGrid(raw);
	const nodes = getNodes(grid);
	const grouped = groupNodesByFrequency(nodes);

	const gridWithAntiNodes = structuredClone(grid);
	const antiNodes: [number, number][] = [];
	for (const node of nodes) {
		const an = getAntiNodeLocations(node, grouped, grid.length, grid[0].length);
		antiNodes.push(...an);
		for (const antiNode of an) {
			if (!gridWithAntiNodes[antiNode[0]][antiNode[1]])
				gridWithAntiNodes[antiNode[0]][antiNode[1]] = [];
			gridWithAntiNodes[antiNode[0]][antiNode[1]]?.push({
				frequency: "#",
				x: antiNode[0],
				y: antiNode[1],
			});
		}
	}
	const uniques = getUniques(antiNodes);
	console.log(uniques.length);
	printGrid(gridWithAntiNodes);
})();
