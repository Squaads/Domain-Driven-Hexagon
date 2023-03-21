module.exports = {
	// this will check Typescript files
	'**/*.(ts),!**/schematics/module/template/**/*': () => 'tsc --noEmit',

	// This will lint and format TypeScript and JavaScript files
	'**/*.(ts|js),!**/schematics/module/template/**/*': filenames => [`eslint --fix ${filenames.join(' ')}`, `prettier --write ${filenames.join(' ')}`],

	// this will Format MarkDown and JSON
	'**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`,
};
