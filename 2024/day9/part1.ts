import fs from "node:fs";
const testing = true;

type Parsed = (string | { size: number })[];
function parse(raw: string): Parsed {
	let output: Parsed = [];
	let i = 0;
	for (; i < raw.length; i++) {
		const curr = Number.parseInt(raw[i]);
		if (i % 2 === 1) {
			output.push({ size: curr });
		} else {
			for (let n = 0; n < curr; n++) output.push(`${i / 2}`);
		}
	}
	return output;
}

function defrag(parsed: Parsed): Parsed {
	let output: Parsed = [];
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

function getCheckSum(defragged: Parsed): number {
	let sum = 0;
	for (let i = 0; i < defragged.length; i++) {
		const curr = defragged[i];
		if (typeof curr === "string") sum += i * Number.parseInt(curr);
	}
	return sum;
}

(function () {
	const raw = fs
		.readFileSync(testing ? "sample-data.txt" : "data.txt")
		.toString();
	const parsed = parse(raw);
	const defragged = defrag(parsed);
	console.log(getCheckSum(defragged));
})();
