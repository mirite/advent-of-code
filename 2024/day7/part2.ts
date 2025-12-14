import fs from "node:fs";

type Equation = [expected: number, constituants: number[]];
type Equations = Equation[];
type Operation = (typeof operations)[number];

const rowPattern = /^(\d+): ([\d ]+)$/gm;
/**
 * @param a
 * @param b
 */
function add(a: number, b: number) {
	return a + b;
}

/**
 * @param a
 * @param b
 */
function concat(a: number, b: number) {
	return Number.parseInt(String(a) + String(b));
}

/**
 * @param a
 * @param b
 */
function multiply(a: number, b: number) {
	return a * b;
}

/** @param raw */
function parse(raw: string): Equations {
	const output: Equations = [];
	const lines = raw.matchAll(rowPattern);
	if (!lines) throw new Error("Input invalid");
	for (const line of lines) {
		output.push([
			Number.parseInt(line[1]),
			line[2].split(" ").map((i) => Number.parseInt(i)),
		]);
	}
	return output;
}

const operations = [add, multiply, concat] as const;

/** @param length */
function buildPossible(length: number): Operation[][] {
	if (length === 0) return [];
	const possibleSolutions: Operation[][] = []; // The items in operations should be arrays of operators equal to the number of gaps in the equation.
	for (const operation of operations) {
		if (length > 1) {
			const possibleFutures = buildPossible(length - 1);
			for (const possibleFuture of possibleFutures) {
				possibleSolutions.push([operation, ...possibleFuture]);
			}
		} else {
			possibleSolutions.push([operation]);
		}
	}
	return possibleSolutions;
}

/** @param equation */
function getSolutionCount(equation: Equation): number {
	const possibleSolutions = buildPossible(equation[1].length - 1);
	let solutions = 0;
	for (const option of possibleSolutions) {
		const acc = performOperations(equation, option);
		if (acc === equation[0]) solutions++;
	}
	return solutions;
}
/**
 * @param equation
 * @param operations
 */
function performOperations(equation: Equation, operations: Operation[]) {
	let acc = equation[1][0];
	for (let i = 0; i < operations.length; i++) {
		acc = operations[i](acc, equation[1][i + 1]);
	}
	return acc;
}

(function () {
	const dataString = fs.readFileSync("data.txt").toString();
	const equations = parse(dataString);
	let sum = 0;

	for (let i = 0; i < equations.length; i++) {
		console.log(`Testing ${i + 1} of ${equations.length}`);
		if (getSolutionCount(equations[i])) sum += equations[i][0];
	}
	console.log(sum);
})();
