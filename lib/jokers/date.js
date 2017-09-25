
import Joker from '../common/joker';

export class DateJoker extends Joker {

  static get name(){ return 'date'; }

  get modifiers() {
    return ['string', 'american', 'year', 'month', 'day'];
  }

  getValue() {
    return this.randomiser.date(this.options);
  }

}

export class HammertimeJoker extends Joker {

  static get name(){ return 'hammertime'; }

  getValue() {
    return this.randomiser.hammertime(this.options);
  }

}

export class TimestampJoker extends Joker {

  static get name(){ return 'timestamp'; }

  getValue() {
    return this.randomiser.timestamp(this.options);
  }

}

export class TimezoneJoker extends Joker {

  static get name(){ return 'timezone'; }

  getValue() {
    return this.randomiser.timezone(this.options);
  }

}