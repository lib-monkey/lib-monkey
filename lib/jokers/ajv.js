
import Joker from '../common/joker';

import { StringJoker, BooleanJoker, IntegerJoker, NaturalJoker, FloatJoker } from './basic';
import { DateJoker } from './date';
import { ArrayJoker, MapJoker, TypedJoker } from './multi';


const TYPE_MAP = {
	'bool': BooleanJoker,
	'boolean': BooleanJoker,
	'number': NaturalJoker,
	'int': IntegerJoker,
	'float': FloatJoker,
	'string': StringJoker,
	'array': ArrayJoker,
	'object': MapJoker
}


/**
 * Ajv Joker
 * @class Jokers.AjvJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.AjvJoker#schema
 * @function
 * @memberof Jokers.AjvJoker
 * @description Sets likelihood of the char to be true
 * @param {(object)} value - Ajv Scheme
 * @returns {Joker} self
 */
export class AjvJoker extends Joker {

	static get name(){ return 'ajv'; }

	get modifiers() {
		return ['schema'];
	}

	getValue() {
		if(!this.options.schema){
			throw new Error('Schema should be provider (ajv.schema(...))')
		}

		let { schema } = this.options;

		let Joker = new (TYPE_MAP[schema.type])(this.randomiser);

		switch(schema.type) {
			case 'object':
				return Joker.of(Object.keys(schema.properties)
					.reduce((acc, key) => ({ 
						...acc, 
						[key]: new AjvJoker(this.randomiser, { schema: schema.properties[key] })
					}), {})).value
			case 'array':
				if(Array.isArray(schema.items)){

				} else {
					return Joker.of(new AjvJoker(this.randomiser, { schema: schema.items })).value
				}
			default:
				return Joker.value;
		}		
	}
}