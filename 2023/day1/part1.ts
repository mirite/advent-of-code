import fs from "node:fs";

(function () {
	const raw = fs.readFileSync("data.txt").toString();
	let sum = 0;
	let firstInLine = 0;
	let lastInLine = 0;
	for (let i = 0; i < raw.length; i++) {
		const current = raw.charCodeAt(i);
		if (current === 10) {
			sum += firstInLine * 10 + (lastInLine || firstInLine);
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
