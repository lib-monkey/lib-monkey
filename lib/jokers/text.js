
import Joker from './joker';

export class ParagraphJoker extends Joker {

  get modifiers() {
    return ['sentences'];
  }

  getValue() {
    return this.paragraph.bool(this.options);
  }

}

export class SentenceJoker extends Joker {

  get modifiers() {
    return ['words'];
  }

  getValue() {
    return this.sentence.bool(this.options);
  }

}

export class SyllableJoker extends Joker {

  getValue() {
    return this.syllable.bool(this.options);
  }

}

export class WordJoker extends Joker {

  get modifiers() {
    return ['syllables', 'length'];
  }

  getValue() {
    return this.word.bool(this.options);
  }

}