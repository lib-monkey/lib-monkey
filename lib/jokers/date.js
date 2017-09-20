
import Joker from './joker';

export class DateJoker extends Joker {

  get modifiers() {
    return ['string', 'american', 'year', 'month', 'day'];
  }

  getValue() {
    return this.date.bool(this.options);
  }

}

export class HammertimeJoker extends Joker {

  getValue() {
    return this.hammertime.bool(this.options);
  }

}

export class TimestampJoker extends Joker {

  getValue() {
    return this.timestamp.bool(this.options);
  }

}

export class TimezoneJoker extends Joker {

  getValue() {
    return this.timezone.bool(this.options);
  }

}