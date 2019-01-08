#!/usr/bin/env node
'use strict';
require('dotenv').config();
const meow = require('meow');
const rgc = require('./reverse-geocode');

const cli = meow(`
	Options
	--batch, -b  If the lat long format is in array
	Example
	  $ rgc '28.657776,77.289506'
		{ '28.657776,77.289506': "Address Text Here"}

	  $ rgc "['28.657776,77.289506', '28.657876,78.289606']"  --batch
		{ '28.657776,77.289506': "Address Text Here", '28.657876,77.289606': "Address Text Here" }

	Exits with code 0 if error and 1 if success
`, {
	booleanDefault: undefined,
	flags: {
		batch: {
			type: 'boolean',
			default: false,
			alias: 'b'
		}
	}
});

if (cli.input.length === 0) {
	console.error('Specify a Lat Lng to reverse geocode');
	process.exit(0);
}

(async () => {
	if (cli.flags.batch) {
		const result = {};
		const input = cli.input[0].replace(/'/g, '"');
		const latlngArr = JSON.parse(input);
		await Promise.all(latlngArr.map(async latlng => {
			result[latlng] = await rgc(latlng);
		}));
		console.log(result);
		process.exit(1);
	} else {
		const result = {};
		result[cli.input[0]] = await rgc(cli.input[0]);
		console.log(result);
		process.exit(1);
	}

})();
