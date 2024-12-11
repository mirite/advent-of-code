import fs from "node:fs";
const testing = true;

function parse(raw: string): string {
	let output = "";
	for (let i = 0; i < raw.length; i++) {
		const curr = Number.parseInt(raw[i]);
		if (i % 2 === 1) {
			for (let n = 0; n < curr; n++) output += ".";
		} else {
			for (let n = 0; n < curr; n++) output += `${i / 2}`;
		}
	}
	return output;
}
(function () {
	const raw = fs
		.readFileSync(testing ? "sample-data.txt" : "data.txt")
		.toString();
	const parsed = parse(raw);
	console.log(parsed);
})();
