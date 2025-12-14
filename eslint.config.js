import { general } from "@mirite/eslint-config-mirite";

export default [
	...general,
	{
		rules: {
			"jsdoc/require-param-description": "off",
			"jsdoc/require-returns": "off",
			"jsdoc/require-template": "off",
			"jsdoc/require-throws": "off",
			"no-console": "off",
		},
	},
];
