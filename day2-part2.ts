import fs from "node:fs";
const rows = fs.readFileSync("day2-data.txt").toString().split("\n").filter(Boolean)
const reports = rows.map(row => row.split(" ").map(v => Number.parseInt(v)));
let sum = 0;
loop1: for (const row of reports) {
	const ascending = row[1] > row[0];
	for (let i = 1; i < row.length; i++) {
		if ((ascending === true && row[i] < row[i - 1]) || (ascending === false && row[i] > row[i - 1]) || Math.abs(row[i] - row[i - 1]) > 3 || Math.abs(row[i] - row[i - 1]) < 1) {
			continue loop1;
		}
	}
	sum++;
}
console.log({ sum, total: rows.length });

