export default {
	"*": ["prettier --write --cache"],
	"*.{ts,tsx,json}": ["sh -c 'tsc --noEmit'"],
};
