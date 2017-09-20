
import Joker from './joker';

export class DateJoker extends Joker {

  get modifiers() {
    return ['string', 'american', 'year', 'month', 'day'];
  }

  getValue() {
    return this.randomiser.date(this.options);
  }

}

export class HammertimeJoker extends Joker {

  getValue() {
    return this.randomiser.hammertime(this.options);
  }

}

export class TimestampJoker extends Joker {

  getValue() {
    return this.randomiser.timestamp(this.options);
  }

}

export class TimezoneJoker extends Joker {

  getValue() {
    return this.randomiser.timezone(this.options);
  }

}