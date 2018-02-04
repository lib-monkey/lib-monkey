
import sinon from 'sinon';
import { expect, assert } from 'chai';
import Chance from 'chance';
import Ajv from 'ajv';

import Joker from '../lib/common/joker';
import { AjvJoker } from '../lib/jokers/ajv';

const randomizer = new Chance();

describe('Ajv Jokers', () => {

	it('Basic Use', () => {
		const schema = {
			"type": "object",
			"properties": {
				"thing": { "type": "number" },
				"asString": { "type": "string" }
			}
		};

		let joker = new AjvJoker(randomizer, { schema });

		const ajv = new Ajv();

		var valid = ajv.validate(schema, joker.value);
		console.log(ajv.errors);
		assert(valid, 'Schema validation failed: ' + ajv.errors.map(err => err.message).join(', '));
	});

});