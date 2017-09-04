
import Joker from './joker';

export class BooleanJoker extends Joker {

  get modifiers() {
    return ['likelihood'];
  }

  get value() {
    return this.randomiser.bool(this.options);
  }

}

export class CharJoker extends Joker {

  get modifiers() {
    return ['pool', 'alpha', 'casing', 'symbols'];
  }

  get value() {
    return this.randomiser.character(this.options);
  }

}

export class FloatJoker extends Joker {

  get modifiers() {
    return ['min', 'max', 'fixed'];
  }

  get value() {
    return this.randomiser.floating(this.options);
  }

}

export class IntegerJoker extends Joker {

  get modifiers() {
    return ['min', 'max'];
  }

  get value() {
    return this.randomiser.integer(this.options);
  }

}

export class StringJoker extends Joker {

  get modifiers() {
    return ['length', 'pool'];
  }

  get value() {
    return this.randomiser.string(this.options);
  }

}