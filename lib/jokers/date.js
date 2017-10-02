
import Joker from '../common/joker';

export class DateJoker extends Joker {

  static get name(){ return 'date'; }

  get modifiers() {
    return ['string', 'american', 'year', 'month', 'day'];
  }

  getValue() {
    if(Object.keys(this.options).length > 0)
      return this.randomiser.date(this.options);
    else
      return this.randomiser.date();
  }

}

export class HammertimeJoker extends Joker {

  static get name(){ return 'hammertime'; }

  getValue() {
    return this.randomiser.hammertime();
  }

}

export class TimestampJoker extends Joker {

  static get name(){ return 'timestamp'; }

  getValue() {
    return this.randomiser.timestamp();
  }

}

export class TimezoneJoker extends Joker {

  static get name(){ return 'timezone'; }

  getValue() {
    return this.randomiser.timezone();
  }

}