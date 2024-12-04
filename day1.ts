import fs from "node:fs";
const raw = fs.readFileSync("test2.txt").toString();
const rows = raw.split("\n");
const l1Raw: number[] = [];
const l2Raw: number[] = [];
for (const row of rows) {
	const split = row.split("   ");
	l1Raw.push(Number.parseInt(split[0]));
	l2Raw.push(Number.parseInt(split[1]));
}
const list1 = l1Raw.toSorted();
const list2 = l2Raw.toSorted();

let sum = 0;
for (let i = 0; i < list1.length - 1; i++) {
	const matches = list2.filter(n => n === list1[i]);
	sum += Math.abs(list1[i] * matches.length);
}
console.log(sum)
