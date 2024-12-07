import fs from "node:fs";

const input = fs.readFileSync("day3-data.txt").toString();
const pattern = /mul\((\d+),(\d+)\)/g;
const commands = input.split(pattern);

let enabled = true;

let sum = 0;
for (let i = 0; i < commands.length - 3; i += 3) {
	const newCommand = commands[i].split(/(do\(\)|don't\(\))/g);
	if (newCommand.length > 1) {
		for (let c = newCommand.length - 1; c >= 0; c--) {
			if (newCommand[c] === "do()") {
				enabled = true;
				break;
			}
			if (newCommand[c] === "don't()") {
				enabled = false;
				break;
			}
		}
	}
	if (enabled) {
		const a = Number.parseInt(commands[i + 1]);
		const b = Number.parseInt(commands[i + 2]);
		const product = a * b;
		sum += product;
	}
}
console.log({ sum });
