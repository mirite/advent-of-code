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
		updates.push(line.split(",").map(s => Number.parseInt(s)));
	} else {
		const split = line.split("|");
		rules.push([Number.parseInt(split[0]), Number.parseInt(split[1])]);
	}
}

console.log({ rules, updates });
