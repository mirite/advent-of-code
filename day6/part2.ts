import fs from "node:fs";
type Direction = 0 | 1 | 2 | 3;
type GuardPosition = [x: number, y: number, facing: Direction];
type Dimensions = { width: number; height: number };
type Cell = boolean;
type Grid = Cell[][];
function inGrid(guardPosition: [x: number, y: number], gridSize: Dimensions) {
	return (
		guardPosition[0] >= 0 &&
		guardPosition[0] < gridSize.width &&
		guardPosition[1] >= 0 &&
		guardPosition[1] < gridSize.height
	);
}

function isObstacle(x: number, y: number, grid: Grid) {
	return grid[y][x] === false;
}

function parseGrid(dataString: string): {
	grid: Grid;
	guardPosition: GuardPosition;
} {
	const grid: Grid = [];
	let x = 0;
	let y = 0;
	let guardPosition: GuardPosition = [-1, -1, 0];

	for (let i = 0; i < dataString.length; i++) {
		const current = dataString[i];
		if (current === "\n" && dataString[i + 1]) {
			y++;
			x = 0;
		} else if (current) {
			if (!grid[y]) {
				grid.push([]);
			}
			if (current === "#") {
				grid[y][x] = false;
			} else if (current === "^") {
				grid[y][x] = true;

				guardPosition = [x, y, 0];
			} else {
				grid[y][x] = true;
			}
			x++;
		}
	}

	return { grid, guardPosition };
}

function isStuck(guardPosition: GuardPosition, visited: GuardPosition[]) {
	return visited.some(
		(p) =>
			p[0] === guardPosition[0] &&
			p[1] === guardPosition[1] &&
			p[2] === guardPosition[2],
	);
}

(function () {
	const dataString = fs.readFileSync("sample-data.txt").toString();
	const { grid, guardPosition } = parseGrid(dataString);

	const visited: GuardPosition[] = [[...guardPosition]];
	const gridSize = { width: grid[0].length, height: grid.length };

	let dx = 0;
	let dy = 0;
	while (true) {
		switch (guardPosition[2]) {
			case 0:
				dy = -1;
				break;
			case 1:
				dx = 1;
				break;
			case 2:
				dy = 1;
				break;
			case 3:
				dx = -1;
		}

		const nextX = guardPosition[0] + dx;
		const nextY = guardPosition[1] + dy;
		if (!inGrid([nextX, nextY], gridSize)) {
			break;
		} else if (isObstacle(nextX, nextY, grid)) {
			console.log(
				`Turning from ${guardPosition[2]} because of obstacle at ${nextX},${nextY}`,
			);
			if (guardPosition[2] === 3) guardPosition[2] = 0;
			else guardPosition[2]++;
		} else {
			guardPosition[0] = nextX;
			guardPosition[1] = nextY;
			visited.push([...guardPosition]);
			console.log(`Moved to ${nextX},${nextY}`);
		}
		if (isStuck(guardPosition, visited)) {
			console.log("Stuck!");
			break;
		}
	}
	console.log(visited.length);
})();
