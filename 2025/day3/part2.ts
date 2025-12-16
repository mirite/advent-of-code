import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Calculate the possible joltage from a single bank.
 *
 * @param bank The bank string.
 * @returns The joltage.
 */
function getBankJoltage(bank: string): number {
	const batteries = bank.split("").map((char) => Number.parseInt(char));
	const digits: number[] = [];
	let lastIndex = 0;

	for (let j = 11; j >= 0; j--) {
		for (let i = lastIndex; i < batteries.length - j; i++) {
			if (!digits[11 - j] || batteries[i] > digits[11 - j]) {
				digits[11 - j] = batteries[i];
				lastIndex = i + 1;
			}
		}
	}
	const sumDigits = digits
		.toReversed()
		.reduce((acc, val, index) => acc + val * 10 ** index);
	return sumDigits;
}

/**
 * Calculate the total output joltage from multiple banks.
 *
 * @param banks The bank strings.
 * @returns The total joltage.
 */
function getOutputJoltage(banks: string[]): { joltage: number } {
	let joltage = 0;
	for (const bank of banks) {
		joltage += getBankJoltage(bank);
	}
	return { joltage };
}

/** Run with input data. */
function run() {
	const data = readFileSync(path.resolve("2025/day3/data.txt"), "utf-8").trim();
	const { joltage } = getOutputJoltage(data.split("\n"));
	console.log(`Output Joltage: ${joltage}`);
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;
	it("should determine the joltage of a bank", () => {
		expect(getBankJoltage("987654321111111")).toBe(987654321111);
		expect(getBankJoltage("811111111111119")).toBe(811111111119);
		expect(getBankJoltage("234234234234278")).toBe(434234234278);
		expect(getBankJoltage("818181911112111")).toBe(888911112111);
	});
	it("Should calculate total joltage", () => {
		expect(
			getOutputJoltage([
				"987654321111111",
				"811111111111119",
				"234234234234278",
				"818181911112111",
			]),
		).toEqual({ joltage: 3121910778619 });
	});
} else {
	run();
}
