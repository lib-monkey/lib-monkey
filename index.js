
require('./dist/console.bindings');

let monkey = require('./dist/monkey');

let lm = { };

monkey.JokerCreator.create(lm);
monkey.RunnerCreator.create(lm);

/**
 * Lib-Monky.
 * @autor Team of Monkeys
 * @property {Jokers.BooleanJoker} bool - return instance of the BooleanJoker
 * @property {Jokers.CharJoker} char - return instance of the CharJoker
 * @property {Jokers.FloatJoker} float - return instance of the FloatJoker
 * @property {Jokers.LetterJoker} letter - return instance of the LetterJoker
 * @property {Jokers.NaturalJoker} natural - return instance of the NaturalJoker
 * @property {Jokers.StringJoker} string - return instance of the StringJoker
 * @property {Jokers.ParagraphJoker} paragraph - return instance of the ParagraphJoker
 * @property {Jokers.SentenceJoker} sentence - return instance of the SentenceJoker
 * @property {Jokers.DateJoker} date - return instance of the DateJoker
 * @property {Jokers.HammertimeJoker} hammertime - return instance of the HammertimeJoker
 * @property {Jokers.TimestampJoker} timestamp - return instance of the TimestampJoker
 * @property {Jokers.TimezoneJoker} timezone - return instance of the TimezoneJoker
 */
module.exports = lm;