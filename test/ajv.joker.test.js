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

		const valid = ajv.validate(schema, joker.value);
		assert(valid, 'Schema validation failed: ' + (ajv.errors || []).map(err => err.message).join(', '));
	});

	it('Simple Ajv Example', () => {

		const schema = {
			"title": "Product",
			"type": "object",
			"properties": {
				"id": {
					"description": "The unique identifier for a product",
					"type": "number"
				},
				"name": {
					"type": "string"
				},
				"price": {
					"type": "number",
					"exclusiveMinimum": 0
				},
				"tags": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"minItems": 1,
					"uniqueItems": true
				},
				"dimensions": {
					"type": "object",
					"properties": {
						"length": {"type": "number"},
						"width": {"type": "number"},
						"height": {"type": "number"}
					},
					"required": ["length", "width", "height"]
				}
			},
			"required": ["id", "name", "price"]
		};

		let joker = new AjvJoker(randomizer, { schema });

		const ajv = new Ajv();

		const valid = ajv.validate(schema, joker.value);
		assert(valid, 'Schema validation failed: ' + (ajv.errors || []).map(err => err.message).join(', '));
	})

});