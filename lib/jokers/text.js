
import Joker from '../common/joker';

export class ParagraphJoker extends Joker {

  static name(){ return 'paragraph'; }

  get modifiers() {
    return ['sentences'];
  }

  getValue() {
    return this.randomiser.paragraph(this.options);
  }

}

export class SentenceJoker extends Joker {

  static name(){ return 'sentence'; }

  get modifiers() {
    return ['words'];
  }

  getValue() {
    return this.randomiser.sentence(this.options);
  }

}

export class SyllableJoker extends Joker {

  static name(){ return 'syllable'; }

  getValue() {
    return this.randomiser.syllable(this.options);
  }

}

export class WordJoker extends Joker {

  static name(){ return 'word'; }

  get modifiers() {
    return ['syllables', 'length'];
  }

  getValue() {
    return this.randomiser.word(this.options);
  }

}