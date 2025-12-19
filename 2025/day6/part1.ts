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

/** @param lines */
function parseLines(lines: string[]): ParsedEquation[] {
	const result: Partial<ParsedEquation>[] = [];
	for (let i = 0; i < lines.length; i++) {
		const splitLine = lines[i].trim().split(/\s+/g);
		for (let j = 0; j < splitLine.length; j++) {
			result[j] ??= { items: [] };
			if (i === lines.length - 1) {
				const char = splitLine[j];
				if (char === "*" || char === "+") {
					result[j].operation = splitLine[j] as "*" | "+";
				} else {
					throw new Error(`Invalid sign ${char} in row ${i}, position ${j}`);
				}
			} else {
				result[j].items?.push(Number(splitLine[j]));
			}
		}
	}
	return result as ParsedEquation[];
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
			{ items: [1, 4], operation: "+" },
			{ items: [2, 5], operation: "*" },
			{ items: [3, 6], operation: "+" },
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
		).toEqual(4277556);
	});
} else {
	run();
}
