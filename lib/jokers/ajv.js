
import Joker from '../common/joker';

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
			throw new Error('schema should be provider (ajv.schema(...))')
		}

		return 123;
	}
}