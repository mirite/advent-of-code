import fs from "node:fs";
const testing = true;

function parse(raw: string): { parsed: string; lastID: number } {
	let output = "";
	let i = 0;
	for (; i < raw.length; i++) {
		const curr = Number.parseInt(raw[i]);
		if (i % 2 === 1) {
			for (let n = 0; n < curr; n++) output += ".";
		} else {
			for (let n = 0; n < curr; n++) output += `${i / 2}`;
		}
	}
	return { parsed: output, lastID: Math.floor((i - 1) / 2) };
}

function defrag(parsed: string, lastID: number): string {
	let output = "";
	let i = 0;
	let j = parsed.length;
	for (; i < j; i++) {
		if (parsed[i] !== ".") {
			output += parsed[i];
		} else {
			for (; j > i; j--) {
				if (parsed[j - 1] === ".") continue;
				const blockSize = String(lastID).length;
				const block = parsed.substring(j - blockSize, j);
				output += block;
				//		console.log({ block, j, blockSize, lastID });
				j -= blockSize;
				const peek = parsed[j - 1];
				if (peek === ".") lastID--;
				break;
			}
		}
	}
	return output;
}

function getCheckSum(defragged: string): number {
	let sum = 0;
	for (let i = 0; i < defragged.length; i++) {
		if (defragged[i] !== ".") sum += i * Number.parseInt(defragged[i]);
	}
	return sum;
}

(function () {
	const raw = fs
		.readFileSync(testing ? "sample-data.txt" : "data.txt")
		.toString();
	const { parsed, lastID } = parse(raw);
	const defragged = defrag(parsed, lastID);
	console.log(getCheckSum(defragged));
})();
