
import Joker from '../common/joker';

export class BooleanJoker extends Joker {

  static name(){ return 'bool'; }

  get modifiers() {
    return ['likelihood'];
  }

  getValue() {
    return this.randomiser.bool(this.options);
  }

}

export class CharJoker extends Joker {

  static name(){ return 'char'; }

  get modifiers() {
    return ['pool', 'alpha', 'casing', 'symbols'];
  }

  getValue() {
    return this.randomiser.character(this.options);
  }

}

export class FloatJoker extends Joker {

  static name(){ return 'float'; }

  get modifiers() {
    return ['min', 'max', 'fixed'];
  }

  getValue() {
    return this.randomiser.floating(this.options);
  }

}

export class IntegerJoker extends Joker {

  static name(){ return 'int'; }

  get modifiers() {
    return ['min', 'max'];
  }

  getValue() {
    return this.randomiser.integer(this.options);
  }

}

export class LetterJoker extends Joker {

  static name(){ return 'letter'; }

  get modifiers() {
    return ['casing'];
  }

  getValue() {
    return this.randomiser.letter(this.options);
  }

}

export class NaturalJoker extends Joker {

  static name(){ return 'natural'; }

  get modifiers() {
    return ['min', 'max'];
  }

  getValue() {
    return this.randomiser.natural(this.options);
  }

}

export class StringJoker extends Joker {

  static name(){ return 'string'; }

  get modifiers() {
    return ['length', 'pool'];
  }

  getValue() {
    return this.randomiser.string(this.options);
  }

}