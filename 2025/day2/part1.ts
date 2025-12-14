import { readFileSync } from "node:fs";
import path from "node:path";

function getInvalidSum(ranges: string[]): { sum: number } {
	return { sum: 0 };
}
function run() {
	const data = readFileSync(path.resolve("2025/day2/data.txt"), "utf-8").trim();
	const { sum } = getInvalidSum(data.split(","));
	console.log(`Invalid IDs sum: ${sum}`);
}

function isValidID(id: number): boolean {
	return false;
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;
	it("should determine the validity of IDs", () => {
		expect(isValidID(11)).toBe(false);
		expect(isValidID(95)).toBe(true);
		expect(isValidID(1000)).toBe(false);
		expect(isValidID(185185)).toBe(false);
		expect(isValidID(1853185)).toBe(true);
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
		).toEqual({ sum: 1227775554 });
	});
} else {
	run();
}
