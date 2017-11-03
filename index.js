
require('./dist/console.bindings');

let monkey = require('./dist/monkey');

let lm = { };

monkey.JokerCreator.create(lm);
monkey.RunnerCreator.create(lm);

/**
 * Lib-Monky.
 * @module lib-monkey
 * @autor Team of Monkeys
 * @property {Jokers.BooleanJoker} bool - return instance of the BooleanJoker
 * @property {Jokers.CharJoker} char - return instance of the CharJoker
 * @property {Jokers.FloatJoker} float - return instance of the FloatJoker
 * @property {Jokers.LetterJoker} letter - return instance of the LetterJoker
 * @property {Jokers.NaturalJoker} natural - return instance of the NaturalJoker
 * @property {Jokers.StringJoker} string - return instance of the StringJoker
 * @property {Jokers.ParagraphJoker} string - return instance of the ParagraphJoker
 * @property {Jokers.SentenceJoker} string - return instance of the SentenceJoker
 */
module.exports = lm;