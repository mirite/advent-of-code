import { readFileSync } from "node:fs";
import path from "node:path";

type ParsedEquation = { items: number[]; operation: "*" | "+" };

/** @param equation */
function calculateEquation(equation: ParsedEquation): number {
	const operation =
		equation.operation === "+"
			? (a: number, b: number) => a + b
			: (a: number, b: number) => a * b;
	return equation.items.reduce(operation);
}
/** @param lines */
function main(lines: string[]) {
	const parsed = parseLines(lines);
	let sum = 0;
	for (const equation of parsed) {
		sum += calculateEquation(equation);
	}
	return sum;
}

/** @param strings */
function parseBuffer(strings: string[]): ParsedEquation {
	const last = strings.at(-1);
	if (!last) throw new Error("No strings in buffer");
	const numeric = Number(last.substring(0, last.length - 1).trim());
	const operation = parseOperation(last.substring(last.length - 1));
	const items = strings.slice(0, strings.length - 1).map(Number);
	items.push(numeric);
	return { items, operation };
}

/** @param lines */
function parseLines(lines: string[]): ParsedEquation[] {
	const result: Partial<ParsedEquation>[] = [];
	const lineLength = lines[0].length;
	let strings: string[] = [];
	for (let col = lineLength - 1; col >= 0; col--) {
		let str = "";
		for (let row = 0; row < lines.length; row++) {
			const char = lines[row][col];
			str += char;
		}
		if (str.trim() === "") {
			const parsed = parseBuffer(strings);
			result.push(parsed);
			strings = [];
		} else {
			strings.push(str);
		}
	}
	result.push(parseBuffer(strings));
	return result as ParsedEquation[];
}

/**
 * @param char
 * @param row
 * @param col
 */
function parseOperation(char: string, row?: number, col?: number) {
	if (char === "*" || char === "+") {
		return char;
	} else {
		throw new Error(`Invalid sign ${char} in row ${row}, position ${col}`);
	}
}
/** Run with input data. */
function run() {
	const data = readFileSync(path.resolve("2025/day6/data.txt"), "utf-8").trim();
	const count = main(data.split("\n"));
	console.log(`Output Count: ${count}`);
}

if (import.meta.vitest) {
	const { expect, it } = import.meta.vitest;

	it("should consolidate equations", () => {
		expect(parseLines(["1 2 3", "4 5 6", "+ * +"])).toEqual([
			{ items: [36], operation: "+" },
			{ items: [25], operation: "*" },
			{ items: [14], operation: "+" },
		]);
		expect(parseLines(["11 25 33", " 4  5 6 ", "+  *  +"])).toEqual([
			{ items: [3, 36], operation: "+" },
			{ items: [55, 2], operation: "*" },
			{ items: [14, 1], operation: "+" },
		]);
	});

	it("should calculate an equation", () => {
		expect(calculateEquation({ items: [1, 4], operation: "+" })).toEqual(5);
		expect(calculateEquation({ items: [2, 5], operation: "*" })).toEqual(10);
		expect(calculateEquation({ items: [3, 6], operation: "+" })).toEqual(9);
	});

	it("should calculate the grand total", () => {
		expect(
			main([
				"123 328  51 64 ",
				" 45 64  387 23 ",
				"  6 98  215 314",
				"*   +   *   +  ",
			]),
		).toEqual(3263827);
	});
} else {
	run();
}
