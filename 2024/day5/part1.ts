import fs from "node:fs";

const lines = fs.readFileSync("day5-data.txt").toString().split("\n");
type Rule = [number, number];
const rules: Rule[] = [];
type Update = number[];
const updates: Update[] = [];
let isUpdatesSection = false;
for (const line of lines) {
	if (line === "") {
		isUpdatesSection = true;
	} else if (isUpdatesSection) {
		updates.push(line.split(",").map((s) => Number.parseInt(s)));
	} else {
		const split = line.split("|");
		rules.push([Number.parseInt(split[0]), Number.parseInt(split[1])]);
	}
}

/** @param update */
function testUpdate(update: Update): boolean {
	const applicableRules = rules.filter(
		([a, b]) => update.includes(a) && update.includes(b),
	);
	return applicableRules.every(
		([a, b]) =>
			update.findIndex((i) => i === b) > update.findIndex((i) => i === a),
	);
}

const correctlyOrdered = updates.filter(testUpdate);
const middles = correctlyOrdered.map((row) => row[Math.floor(row.length / 2)]);
const sum = middles.reduce((acc, curr) => curr + acc, 0);
console.log(sum);
