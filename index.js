
require('./dist/console.bindings');

let monkey = require('./dist/monkey');

let lm = { };

monkey.JokerCreator.create(lm);
monkey.RunnerCreator.create(lm);

/**
 * Lib-Monky.
 * @module lib-monkey
 * @autor Team of Monkeys
 * @property {BooleanJoker} bool - return instance of the BooleanJoker
 * @property {CharJoker} char - return instance of the CharJoker
 * @property {FloatJoker} float - return instance of the FloatJoker
 * @property {LetterJoker} letter - return instance of the LetterJoker
 * @property {NaturalJoker} natural - return instance of the NaturalJoker
 * @property {StringJoker} string - return instance of the StringJoker
 */
module.exports = lm;