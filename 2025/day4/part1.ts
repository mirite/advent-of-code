import { readFileSync } from "node:fs";
import path from "node:path";

const ROLL_CHAR = "@";
const ADJACENT_ROLL_LIMIT = 4;

/**
 * Counts the number of rolls in the specified cells.
 *
 * @param grid The grid of cells.
 * @param cells The list of cell coordinates to check.
 * @returns The count of rolls in the specified cells.
 */
function countRollsInCells(
	grid: string[][],
	cells: [y: number, x: number][],
): number {
	let sum = 0;
	for (const [y, x] of cells) {
		if (grid[y][x] === ROLL_CHAR) {
			sum++;
		}
	}
	return sum;
}

/**
 * Calculate the total accessible rolls in the grid.
 *
 * @param rows The rows of the grid.
 * @returns The count of accessible rolls.
 */
function getAccessibleRolls(rows: string[]): { count: number } {
	const grid = rows.map((row) => row.split(""));
	const gridSize: [height: number, width: number] = [
		grid.length,
		grid[0].length,
	];
	let accessibleCount = 0;
	for (let x = 0; x < gridSize[1]; x++) {
		for (let y = 0; y < gridSize[1]; y++) {
			const adjacentCells = getAdjectCells(gridSize, y, x);
			const rollCount = countRollsInCells(grid, adjacentCells);
			if (rows[y][x] === ROLL_CHAR && rollCount < ADJACENT_ROLL_LIMIT) {
				accessibleCount++;
			}
		}
	}
	return { count: accessibleCount };
}

/**
 * Gets the coordinates of adjacent cells.
 *
 * @param gridSize The size of the grid [width, height].
 * @param cellX The x coordinate.
 * @param cellY The y coordinate.
 * @returns The list of adjacent cell coordinates.
 */
function getAdjectCells(
	gridSize: [height: number, width: number],
	cellX: number,
	cellY: number,
): [x: number, y: number][] {
	const adjacentCells: [number, number][] = [];

	for (
		let y = Math.max(0, cellY - 1);
		y <= Math.min(gridSize[1] - 1, cellY + 1);
		y++
	) {
		for (
			let x = Math.max(0, cellX - 1);
			x <= Math.min(gridSize[0] - 1, cellX + 1);
			x++
		) {
			if (x !== cellX || y !== cellY) {
				adjacentCells.push([x, y]);
			}
		}
	}

	return adjacentCells;
}
/** Run with input data. */
function run() {
	const data = readFileSync(path.resolve("2025/day4/data.txt"), "utf-8").trim();
	const { count } = getAccessibleRolls(data.split("\n"));
	console.log(`Output Count: ${count}`);
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;
	it("should get adjacent cells", () => {
		expect(getAdjectCells([8, 8], 1, 1)).toEqual([
			[0, 0],
			[1, 0],
			[2, 0],
			[0, 1],
			[2, 1],
			[0, 2],
			[1, 2],
			[2, 2],
		]);
		expect(getAdjectCells([8, 8], 0, 0)).toEqual([
			[1, 0],
			[0, 1],
			[1, 1],
		]);
		expect(getAdjectCells([8, 8], 7, 7)).toEqual([
			[6, 6],
			[7, 6],
			[6, 7],
		]);
	});

	it("should count the rolls in cells", () => {
		const grid = [
			["@", "", "@"],
			["@", "", "@"],
		];
		expect(
			countRollsInCells(grid, [
				[0, 0],
				[1, 0],
				[0, 2],
			]),
		).toBe(3);
	});
	it("Should calculate total accessible rolls", () => {
		expect(
			getAccessibleRolls([
				"..@@.@@@@.",
				"@@@.@.@.@@",
				"@@@@@.@.@@",
				"@.@@@@..@.",
				"@@.@@@@.@@",
				".@@@@@@@.@",
				".@.@.@.@@@",
				"@.@@@.@@@@",
				".@@@@@@@@.",
				"@.@.@@@.@.",
			]),
		).toEqual({ count: 13 });
	});
} else {
	run();
}
