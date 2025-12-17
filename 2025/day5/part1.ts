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
	return 0;
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
