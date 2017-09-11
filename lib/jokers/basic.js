
import Joker from './joker';

export class BooleanJoker extends Joker {

  get modifiers() {
    return ['likelihood'];
  }

  getValue() {
    return this.randomiser.bool(this.options);
  }

}

export class CharJoker extends Joker {

  get modifiers() {
    return ['pool', 'alpha', 'casing', 'symbols'];
  }

  getValue() {
    return this.randomiser.character(this.options);
  }

}

export class FloatJoker extends Joker {

  get modifiers() {
    return ['min', 'max', 'fixed'];
  }

  getValue() {
    return this.randomiser.floating(this.options);
  }

}

export class IntegerJoker extends Joker {

  get modifiers() {
    return ['min', 'max'];
  }

  getValue() {
    return this.randomiser.integer(this.options);
  }

}

export class StringJoker extends Joker {

  get modifiers() {
    return ['length', 'pool'];
  }

  getValue() {
    return this.randomiser.string(this.options);
  }

}