import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Get the count of fresh ingredients.
 *
 * @param lines The input lines.
 * @returns The count of fresh ingredients.
 */
function getFreshIngredients(lines: string[]): number {
	const { ingredients, ranges } = parseInput(lines);
	let freshCount = 0;
	for (const ingredient of ingredients) {
		if (isFresh(ingredient, ranges)) {
			freshCount++;
		}
	}
	return freshCount;
}
/**
 * @param ingredient
 * @param ranges
 */
function isFresh(ingredient: number, ranges: [number, number][]): boolean {
	for (const [start, end] of ranges) {
		if (start <= ingredient && ingredient <= end) {
			return true;
		}
	}
	return false;
}

/** @param lines */
function parseInput(lines: string[]) {
	const output: { ingredients: number[]; ranges: [number, number][] } = {
		ingredients: [],
		ranges: [],
	};
	for (const line of lines) {
		if (line.trim() === "") {
			continue;
		}
		if (line.includes("-")) {
			output.ranges.push(line.split("-").map(Number) as [number, number]);
		} else {
			output.ingredients.push(Number(line));
		}
	}
	return output;
}

/** Run with input data. */
function run() {
	const data = readFileSync(path.resolve("2025/day5/data.txt"), "utf-8").trim();
	const count = getFreshIngredients(data.split("\n"));
	console.log(`Output Count: ${count}`);
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;

	it("should determine if an ingredient is fresh", () => {
		const ranges: [number, number][] = [
			[3, 5],
			[10, 14],
			[16, 20],
			[12, 18],
		];
		expect(isFresh(1, ranges)).toBe(false);
		expect(isFresh(5, ranges)).toBe(true);
		expect(isFresh(8, ranges)).toBe(false);
		expect(isFresh(11, ranges)).toBe(true);
		expect(isFresh(17, ranges)).toBe(true);
		expect(isFresh(32, ranges)).toBe(false);
	});
	it("Should parse the input rows", () => {
		expect(parseInput(["1-3", "4-5", "", "5", "6"])).toEqual({
			ingredients: [5, 6],
			ranges: [
				[1, 3],
				[4, 5],
			],
		});
	});

	it("should count fresh ingredients", () => {
		expect(
			getFreshIngredients([
				"3-5",
				"10-14",
				"16-20",
				"12-18",
				"",
				"1",
				"5",
				"8",
				"11",
				"17",
				"32",
			]),
		).toBe(3);
	});
} else {
	run();
}
