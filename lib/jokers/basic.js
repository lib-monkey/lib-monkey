
import Joker from './joker';

export class IntegerJoker extends Joker {

  get value() {
    return this.randomiser.integer();
  }

}

export class StringJoker extends Joker {

  get value() {
    return this.randomiser.string();
  }

}