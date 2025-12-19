import { readFileSync } from "node:fs";
import path from "node:path";

type Range = [number, number];
type Ranges = Range[];
/**
 * Get the count of fresh ingredients.
 *
 * @param lines The input lines.
 * @returns The count of fresh ingredients.
 */
function getFreshIngredients(lines: string[]): number {
	const { ranges } = parseInput(lines);
	const merged = mergeRanges(ranges);
	let count = 0;

	for (const range of merged) {
		count += range[1] - range[0] + 1;
	}
	return count;
}

/**
 * Consolidates overlapping ranges.
 *
 * @param ranges The ranges to merge.
 * @returns The merged ranges.
 */
function mergeRanges(ranges: Ranges): Ranges {
	const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);
	const mergedRanges: Ranges = [];
	for (let i = 0; i < sortedRanges.length; i++) {
		const current = sortedRanges[i];
		if (current === undefined) continue;
		let nextOffset = i + 1;
		while (
			sortedRanges[nextOffset] &&
			sortedRanges[nextOffset][0] <= current[1]
		) {
			current[1] = Math.max(current[1], sortedRanges[nextOffset][1]);
			// eslint-disable-next-line @typescript-eslint/no-array-delete
			delete sortedRanges[nextOffset];
			nextOffset++;
		}
		mergedRanges.push(current);
	}
	return mergedRanges;
}
/** @param lines */
function parseInput(lines: string[]) {
	const output: { ingredients: number[]; ranges: Ranges } = {
		ingredients: [],
		ranges: [],
	};
	for (const line of lines) {
		if (line.trim() === "") {
			continue;
		}
		if (line.includes("-")) {
			output.ranges.push(line.split("-").map(Number) as Range);
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

	it("should merge ranges", () => {
		expect(
			mergeRanges([
				[1, 5],
				[9, 10],
				[3, 7],
			]),
		).toEqual([
			[1, 7],
			[9, 10],
		]);
		expect(
			mergeRanges([
				[1, 5],
				[2, 4],
				[3, 7],
			]),
		).toEqual([[1, 7]]);
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
		).toBe(14);
	});
} else {
	run();
}
