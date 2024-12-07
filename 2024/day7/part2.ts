import fs from "node:fs";
type Equation = [expected: number, constituants: number[]];
type Equations = Equation[];
type Operation = (typeof operations)[number];

const rowPattern = /^(\d+): ([\d ]+)$/gm;
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

function add(a: number, b: number) {
	return a + b;
}

function multiply(a: number, b: number) {
	return a * b;
}

function concat(a: number, b: number) {
	return Number.parseInt(String(a) + String(b));
}

const operations = [add, multiply, concat] as const;

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

function performOperations(equation: Equation, operations: Operation[]) {
	let acc = equation[1][0];
	for (let i = 0; i < operations.length; i++) {
		acc = operations[i](acc, equation[1][i + 1]);
	}
	return acc;
}
function getSolutionCount(equation: Equation): number {
	const possibleSolutions = buildPossible(equation[1].length - 1);
	let solutions = 0;
	for (const option of possibleSolutions) {
		const acc = performOperations(equation, option);
		if (acc === equation[0]) solutions++;
	}
	return solutions;
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
