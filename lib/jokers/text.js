import Joker from '../common/joker';

/**
 * Paragraph Joker
 * @class Jokers.ParagraphJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.ParagraphJoker#sentences
 * @function
 * @memberof Jokers.ParagraphJoker
 * @description Sets amount of sentences in the paragraph
 * @param {number} value
 * @returns {Joker} self
 */
export class ParagraphJoker extends Joker {

  static get name(){ return 'paragraph'; }

  get modifiers() {
    return ['sentences'];
  }

  getValue() {
    return this.randomiser.paragraph(this.options);
  }

}

/**
 * Sentence Joker
 * @class Jokers.SentenceJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.SentenceJoker#sentences
 * @function
 * @memberof Jokers.SentenceJoker
 * @description Sets amount of words in the sentence
 * @param {number} value
 * @returns {Joker} self
 */
export class SentenceJoker extends Joker {

  static get name(){ return 'sentence'; }

  get modifiers() {
    return ['words'];
  }

  getValue() {
    return this.randomiser.sentence(this.options);
  }

}

/**
 * Syllable Joker
 * @class Jokers.SyllableJoker
 * @extends Joker
 * @inheritdoc
 */
export class SyllableJoker extends Joker {

  static get name(){ return 'syllable'; }

  getValue() {
    return this.randomiser.syllable(this.options);
  }

}

/**
 * Word Joker
 * @class Jokers.WordJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.WordJoker#length
 * @function
 * @memberof Jokers.WordJoker
 * @description Sets lenght of the word
 * @param {number} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.WordJoker#syllables
 * @function
 * @memberof Jokers.WordJoker
 * @description Sets amount of syllables in the word
 * @param {number} value
 * @returns {Joker} self
 */
export class WordJoker extends Joker {

  static get name(){ return 'word'; }

  get modifiers() {
    return ['syllables', 'length'];
  }

  getValue() {
    return this.randomiser.word(this.options);
  }

}