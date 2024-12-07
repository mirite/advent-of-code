import fs from "node:fs";

const replacements = [
	["one", "1"],
	["two", "2"],
	["three", "3"],
	["four", "4"],
	["five", "5"],
	["six", "6"],
	["seven", "7"],
	["eight", "8"],
	["nine", "9"],
];

(function () {
	let raw = fs.readFileSync("sample-data-2.txt").toString();
	let sum = 0;
	let firstInLine = 0;
	let lastInLine = 0;
	for (const [text, number] of replacements) {
		raw = raw.replaceAll(text, number);
	}
	console.log({ raw });
	for (let i = 0; i < raw.length; i++) {
		const current = raw.charCodeAt(i);
		if (current === 10) {
			sum += firstInLine * 10 + (lastInLine || firstInLine);
			console.log({
				firstInLine,
				lastInLine,
				value: firstInLine * 10 + (lastInLine || firstInLine),
			});
			firstInLine = 0;
			lastInLine = 0;
		} else if (current >= 49 && current <= 57) {
			if (!firstInLine) {
				firstInLine = current - 48;
			} else {
				lastInLine = current - 48;
			}
		}
	}
	console.log(sum);
})();
