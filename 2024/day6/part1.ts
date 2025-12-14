import fs from "node:fs";

type Cell = [open: boolean, visited: boolean];
type Dimensions = { height: number; width: number };
type Grid = Cell[][];
type GuardPosition = [x: number, y: number, facing: 0 | 1 | 2 | 3];

/**
 * @param guardPosition
 * @param gridSize
 */
function inGrid(guardPosition: [x: number, y: number], gridSize: Dimensions) {
	return (
		guardPosition[0] >= 0 &&
		guardPosition[0] < gridSize.width &&
		guardPosition[1] >= 0 &&
		guardPosition[1] < gridSize.height
	);
}

/**
 * @param x
 * @param y
 * @param grid
 */
function isObstacle(x: number, y: number, grid: Grid) {
	return grid[y][x][0] === false;
}

/** @param dataString */
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
				grid[y][x] = [false, false];
			} else if (current === "^") {
				grid[y][x] = [true, true];
				guardPosition = [x, y, 0];
			} else {
				grid[y][x] = [true, false];
			}
			x++;
		}
	}

	return { grid, guardPosition };
}

(function () {
	const dataString = fs.readFileSync("data.txt").toString();
	const { grid, guardPosition } = parseGrid(dataString);

	const gridSize = { height: grid.length, width: grid[0].length };

	while (true) {
		let dx = 0;
		let dy = 0;
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
			console.log(`Turning from ${guardPosition[2]}`);
			if (guardPosition[2] === 3) guardPosition[2] = 0;
			else guardPosition[2]++;
		} else {
			grid[nextY][nextX][1] = true;
			guardPosition[0] = nextX;
			guardPosition[1] = nextY;
			console.log(`Moved to ${nextX},${nextY}`);
		}
	}
	console.log(grid.flat().reduce((acc, curr) => acc + Number(curr[1]), 0));
})();
