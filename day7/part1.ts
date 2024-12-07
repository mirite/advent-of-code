import fs from "node:fs";
type Equation = [expected: number, constituants: number[]];
type Equations = Equation[];

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

(function () {
	const dataString = fs.readFileSync("sample-data.txt").toString();
	const equations = parse(dataString);
	console.log(equations);
})();
