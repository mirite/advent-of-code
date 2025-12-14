import { readFileSync } from "node:fs";
import path from "node:path";

const TICKS_PER_REVOLUTION = 100;
const DIRECTIONS = { L: -1, R: 1 } as const;
type MoveDirection = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

/** @param char */
function charToDirection(char: string) {
	return (
		DIRECTIONS[char as keyof typeof DIRECTIONS] ??
		(() => {
			throw new Error(`Invalid direction character: ${char}`);
		})()
	);
}

/** @param lines */
function executeInstruction(lines: string[]): number {
	let position = 50;
	let timeVisitedZero = 0;
	for (const line of lines) {
		position = turn(position, ...parseInstruction(line));
		if (position === 0) {
			timeVisitedZero++;
		}
	}
	return timeVisitedZero;
}
/** @param instruction */
function parseInstruction(
	instruction: string,
): [direction: MoveDirection, amount: number] {
	const direction = charToDirection(instruction.substring(0, 1));
	const distance = parseInt(instruction.substring(1), 10);
	return [direction, distance];
}
function run() {
	const data = readFileSync(path.resolve("2025/day1/data.txt"), "utf-8").trim();
	const timeVisitedZero = executeInstruction(data.split("\n"));
	console.log(`Times visited zero: ${timeVisitedZero}`);
}

/**
 * @param current
 * @param direction
 * @param amount
 */
function turn(
	current: number,
	direction: MoveDirection,
	amount: number,
): number {
	let result = current + direction * amount;
	while (result < 0) {
		result += TICKS_PER_REVOLUTION;
	}
	while (result >= TICKS_PER_REVOLUTION) {
		result -= TICKS_PER_REVOLUTION;
	}
	return result;
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;
	it("turns clockwise", () => {
		expect(turn(0, 1, 10)).toBe(10);
		expect(turn(90, 1, 10)).toBe(0);
		expect(turn(90, 1, 200)).toBe(90);
	});
	it("turns counter-clockwise", () => {
		expect(turn(10, -1, 10)).toBe(0);
		expect(turn(0, -1, 10)).toBe(90);
		expect(turn(10, -1, 200)).toBe(10);
	});

	it("converts characters to directions", () => {
		expect(charToDirection("L")).toBe(-1);
		expect(charToDirection("R")).toBe(1);
		expect(() => charToDirection("X")).toThrow();
	});
	it("parses instructions", () => {
		expect(parseInstruction("L10")).toEqual([-1, 10]);
		expect(parseInstruction("L2")).toEqual([-1, 2]);
		expect(parseInstruction("R25")).toEqual([1, 25]);
	});
	it("calculates zeros", () => {
		expect(
			executeInstruction([
				"L68",
				"L30",
				"R48",
				"L5",
				"R60",
				"L55",
				"L1",
				"L99",
				"R14",
				"L82",
			]),
		).toBe(3);
	});
} else {
	run();
}
