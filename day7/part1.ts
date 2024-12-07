import fs from "node:fs";
import { type } from "node:os";
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

const operations = [add, multiply] as const;

function isRowSolvable(equation: Equation): boolean {
	const possibleSolutions: Operation[][] = []; // The items in operations should be arrays of operators equal to the number of gaps in the equation.
	for (let i = 0; i < equation[1].length - 1; i++) {
		const possibleSolution: Operation[] = [];
		for (const operation of operations) {
			for (let j = 0; j < equation[1].length - 1; j++) {
				possibleSolution.push(operation);
			}
		}
		possibleSolutions.push(possibleSolution);
	}
	console.log({ possibleSolutions });
	const expectedCount = Math.pow(2, equation[1].length - 1);
	if (possibleSolutions.length != expectedCount)
		throw new Error(
			`Incorrect number of equations generated. Got ${possibleSolutions.length}, expected ${expectedCount}`,
		);
	for (const option of possibleSolutions) {
		let acc = equation[1][0];
		for (let i = 0; i < option.length; i++) {
			acc = option[i](acc, equation[1][i + 1]);
		}
	}
	return true;
}

(function () {
	const dataString = fs.readFileSync("sample-data.txt").toString();
	const equations = parse(dataString);
	const solvable = equations.filter(isRowSolvable);
	console.log(equations);
})();
