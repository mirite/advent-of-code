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
function sumArray(arr: number[]) {
	return arr.reduce((acc, curr) => curr + acc, 0);
}
function getApplicableRules(update: Update): Rule[] {
	return rules.filter(([a, b]) => update.includes(a) && update.includes(b));
}

function testApplicableRule(update: Update, rule: Rule): boolean {
	return (
		update.findIndex((i) => i === rule[1]) >
		update.findIndex((i) => i === rule[0])
	);
}
function testUpdate(update: Update): boolean {
	const applicableRules = getApplicableRules(update);
	return applicableRules.every((r) => testApplicableRule(update, r));
}

function fixUpdate(update: Update): Update {
	const applicableRules = getApplicableRules(update);
	let violations;
	do {
		violations = applicableRules.filter((r) => !testApplicableRule(update, r));
		if (violations.length === 0) {
			break;
		}
		const violation = violations[0];
		let index1 = update.indexOf(violation[0]);
		let index2 = update.indexOf(violation[1]);
		let temp = update[index1];
		update[index1] = update[index2];
		update[index2] = temp;
	} while (violations.length > 1);

	return update;
}
const incorrectlyOrdered = updates.filter((u) => !testUpdate(u));
const fixed = incorrectlyOrdered.map(fixUpdate);
const middles = fixed.map((row) => row[Math.floor(row.length / 2)]);
const sum = sumArray(middles);
console.log(sum);
