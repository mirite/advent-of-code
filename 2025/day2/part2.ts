import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Calculate the sum of invalid IDs in the given ranges.
 *
 * @param ranges The ranges of IDs.
 * @returns The sum of invalid IDs.
 */
function getInvalidSum(ranges: string[]): { sum: number } {
	let sum = 0;
	for (const range of ranges) {
		const rangeParts = range
			.split("-")
			.map((part) => Number.parseInt(part.trim()));
		const { sum: rangeSum } = getInvalidSumInRange(rangeParts);
		sum += rangeSum;
	}
	return { sum };
}

/**
 * Sum invalid IDs in range.
 *
 * @param rangeParts The range parts [start, end].
 * @returns The sum of invalid IDs.
 */
function getInvalidSumInRange(rangeParts: number[]) {
	let sum = 0;
	for (let id = rangeParts[0]; id <= rangeParts[1]; id++) {
		const valid = isValidID(id);
		if (!valid) {
			sum += id;
		}
	}
	return { sum };
}
/**
 * Determine if an ID is valid.
 *
 * @param id The ID to check.
 * @returns True if valid, false otherwise.
 */
function isValidID(id: number): boolean {
	const idStr = id.toString();
	for (let sectionLength = idStr.length; sectionLength > 0; sectionLength--) {
		if (idStr.length % sectionLength !== 0) continue;
		let last: null | string = null;

		for (let i = 0; i < idStr.length; i += sectionLength) {
			const current = idStr.substring(i, i + sectionLength);
			if (last) {
				if (current !== last) {
					break;
				}
				if (i + sectionLength >= idStr.length) {
					return false;
				}
			} else {
				last = current;
			}
		}
	}
	return true;
}

/** Run with input data. */
function run() {
	const data = readFileSync(path.resolve("2025/day2/data.txt"), "utf-8").trim();
	const { sum } = getInvalidSum(data.split(","));
	console.log(`Invalid IDs sum: ${sum}`);
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;
	it("should determine the validity of IDs", () => {
		expect(isValidID(11)).toBe(false);
		expect(isValidID(95)).toBe(true);
		expect(isValidID(1000)).toBe(true);
		expect(isValidID(185185)).toBe(false);
		expect(isValidID(1853185)).toBe(true);
		expect(isValidID(22222222)).toBe(false);
		expect(isValidID(234234234)).toBe(false);
	});
	it("Should sum invalid IDs", () => {
		expect(
			getInvalidSum([
				"11-22",
				"95-115",
				"998-1012",
				"1188511880-1188511890",
				"222220-222224",
				"1698522-1698528",
				"446443-446449",
				"38593856-38593862",
				"565653-565659",
				"824824821-824824827",
				"2121212118-2121212124",
			]),
		).toEqual({ sum: 4174379265 });
	});
} else {
	run();
}
