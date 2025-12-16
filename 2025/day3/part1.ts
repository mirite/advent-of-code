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
	let highestIndex = 0;
	let secondHighest = 0;
	let highest = 0;
	for (let i = 0; i < batteries.length - 1; i++) {
		if (batteries[i] > highest) {
			highestIndex = i;
			highest = batteries[i];
		}
	}
	for (let i = highestIndex + 1; i < batteries.length; i++) {
		if (batteries[i] > secondHighest) {
			secondHighest = batteries[i];
		}
	}
	return highest * 10 + secondHighest;
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
		expect(getBankJoltage("987654321111111")).toBe(98);
		expect(getBankJoltage("811111111111119")).toBe(89);
		expect(getBankJoltage("234234234234278")).toBe(78);
		expect(getBankJoltage("818181911112111")).toBe(92);
	});
	it("Should calculate total joltage", () => {
		expect(
			getOutputJoltage([
				"987654321111111",
				"811111111111119",
				"234234234234278",
				"818181911112111",
			]),
		).toEqual({ joltage: 357 });
	});
} else {
	run();
}
