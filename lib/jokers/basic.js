import Joker from '../common/joker';

/**
 * Boolean Joker
 * @class Jokers.BooleanJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.BooleanJoker#likelihood
 * @function
 * @memberof Jokers.BooleanJoker
 * @description Sets likelihood of the char to be true
 * @param {(number|bool)} value - Defaults to 'true'
 * @returns {Joker} self
 */
export class BooleanJoker extends Joker {

	static get name(){ return 'bool'; }

	get modifiers() {
		return ['likelihood'];
	}

	getValue() {
		return this.randomiser.bool(this.options);
	}
}

/**
 * Char Joker
 * @class Jokers.CharJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.CharJoker#pool
 * @function
 * @memberof Jokers.CharJoker
 * @description Sets pool of chars to use.
 * @param {string} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.CharJoker#alpha
 * @function
 * @memberof Jokers.CharJoker
 * @description Specify alpha for only an alphanumeric character.
 * @param {bool} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.CharJoker#casing
 * @function
 * @memberof Jokers.CharJoker
 * @description Specify upper/lower case.
 * @param {string} value - 'upper' or 'lower'.
 * @returns {Joker} self
 */
 /**
 * @name Jokers.CharJoker#symbols
 * @function
 * @memberof Jokers.CharJoker
 * @description Specify for symbols only.
 * @param {bool} value
 * @returns {Joker} self
 */
export class CharJoker extends Joker {
	
	static get name(){ return 'char'; }

	get modifiers() {
		return ['pool', 'alpha', 'casing', 'symbols'];
	}

	getValue() {
		return this.randomiser.character(this.options);
	}

}

/**
 * Float Joker
 * @class Jokers.FloatJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.FloatJoker#min
 * @function
 * @memberof Jokers.FloatJoker
 * @description Set min value of the joker.
 * @param {float} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.FloatJoker#max
 * @function
 * @memberof Jokers.FloatJoker
 * @description Set max value of the joker.
 * @param {float} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.FloatJoker#symbols
 * @function
 * @memberof Jokers.FloatJoker
 * @description Set number of fixed digits after the decimal.
 * @param {number} value
 * @returns {Joker} self
 */
export class FloatJoker extends Joker {

	static get name(){ return 'float'; }

	get modifiers() {
		return ['min', 'max', 'fixed'];
	}

	getValue() {
		return this.randomiser.floating(this.options);
	}

}

/**
 * Integer Joker
 * @class Jokers.IntegerJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.IntegerJoker#min
 * @function
 * @memberof Jokers.IntegerJoker
 * @description Set min value of the joker.
 * @param {int} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.IntegerJoker#max
 * @function
 * @memberof Jokers.IntegerJoker
 * @description Set max value of the joker.
 * @param {int} value
 * @returns {Joker} self
 */
export class IntegerJoker extends Joker {

	static get name(){ return 'int'; }

	get modifiers() {
		return ['min', 'max'];
	}

	getValue() {
		return this.randomiser.integer(this.options);
	}

}

/**
 * Letter Joker
 * @class Jokers.LetterJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.LetterJoker#casing
 * @function
 * @memberof Jokers.LetterJoker
 * @description Specify upper/lower case.
 * @param {string} value - 'upper' or 'lower'.
 * @returns {Joker} self
 */
export class LetterJoker extends Joker {

	static get name(){ return 'letter'; }

	get modifiers() {
		return ['casing'];
	}

	getValue() {
		return this.randomiser.letter(this.options);
	}

}

/**
 * Natural Joker
 * @class Jokers.NaturalJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.NaturalJoker#min
 * @function
 * @memberof Jokers.NaturalJoker
 * @description Set min value of the joker.
 * @param {int} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.NaturalJoker#max
 * @function
 * @memberof Jokers.NaturalJoker
 * @description Set max value of the joker.
 * @param {int} value
 * @returns {Joker} self
 */
export class NaturalJoker extends Joker {

	static get name(){ return 'natural'; }

	get modifiers() {
		return ['min', 'max'];
	}

	getValue() {
		return this.randomiser.natural(this.options);
	}

}

/**
 * String Joker
 * @class Jokers.StringJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.StringJoker#pool
 * @function
 * @memberof Jokers.StringJoker
 * @description Sets pool of chars to use.
 * @param {string} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.StringJoker#symbols
 * @function
 * @memberof Jokers.StringJoker
 * @description Set Length of string.
 * @param {number} value
 * @returns {Joker} self
 */
export class StringJoker extends Joker {

	static get name(){ return 'string'; }

	get modifiers() {
		return ['length', 'pool'];
	}

	getValue() {
		return this.randomiser.string(this.options);
	}

}