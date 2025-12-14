import fs from "node:fs";

type CubeSet = { blue: number; green: number; red: number };
type Game = { cubeSets: CubeSet[]; id: number };

const Mode = {
	BetweenSets: 4,
	ReadingColour: 3,
	ReadingId: 0,
	ReadingQuantity: 2,
	StartingSet: 1,
};

/** @param char */
function isLetter(char: string) {
	return char >= "a" && char <= "z";
}

/** @param char */
function isNumeral(char: string) {
	return char >= "0" && char <= "9";
}

const cubesInBag = { blue: 14, green: 13, red: 12 };

/** @param raw */
function parseGrid(raw: string): Game[] {
	const games: Game[] = [];
	let mode = Mode.ReadingId;
	let buffer = "";
	let colourBuffer = "";
	let currentSet: CubeSet = { blue: 0, green: 0, red: 0 };
	let currentGame: Game = { cubeSets: [], id: 0 };
	for (let i = 0; i < raw.length; i++) {
		const curr = raw[i];
		if (mode === Mode.ReadingId) {
			if (isNumeral(curr)) {
				buffer += curr;
			} else if (curr === ":") {
				currentGame.id = Number.parseInt(buffer);
				buffer = "";
				mode = Mode.StartingSet;
			}
		} else if (mode === Mode.StartingSet) {
			if (isNumeral(curr)) {
				buffer = curr;
				mode = Mode.ReadingQuantity;
			}
		} else if (mode === Mode.ReadingQuantity) {
			if (isNumeral(curr)) {
				buffer += curr;
			} else if (buffer !== "") {
				mode = Mode.ReadingColour;
			}
		} else if (mode === Mode.ReadingColour) {
			if (isLetter(curr)) {
				colourBuffer += curr;
			} else if (colourBuffer !== "") {
				currentSet[colourBuffer as keyof CubeSet] = Number.parseInt(buffer);
				buffer = "";
				colourBuffer = "";
				if (curr === ",") {
					mode = Mode.ReadingQuantity;
				} else {
					currentGame.cubeSets.push(currentSet);
					currentSet = { blue: 0, green: 0, red: 0 };
					if (curr === ";") {
						mode = Mode.StartingSet;
					} else {
						games.push(currentGame);
						currentGame = { cubeSets: [], id: 0 };
						mode = Mode.ReadingId;
					}
				}
			}
		}
	}
	return games;
}
(function () {
	const raw = fs.readFileSync("data.txt").toString();
	const parsed = parseGrid(raw);
	let sum = 0;

	game: for (const game of parsed) {
		console.dir(game, { depth: 3 });
		for (const cubeSet of game.cubeSets) {
			if (
				cubeSet.green > cubesInBag.green ||
				cubeSet.blue > cubesInBag.blue ||
				cubeSet.red > cubesInBag.red
			) {
				continue game;
			}
		}
		sum += game.id;
	}
	console.dir(sum);
})();
