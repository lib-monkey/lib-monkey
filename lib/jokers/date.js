
import Joker from '../common/joker';

/**
 * Date Joker, For more methods see {@link http://momentjs.com/|moment }
 * @class Jokers.DateJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.DateJoker#string
 * @function
 * @memberof Jokers.DateJoker
 * @description Sets if the value returns as string or Date
 * @param {bool} value - Defaults to 'true'
 * @returns {Joker} self
 */
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

/**
 * Hammertime Joker
 * @class Jokers.HammertimeJoker
 * @extends Joker
 * @inheritdoc
 */
export class HammertimeJoker extends Joker {

  static get name(){ return 'hammertime'; }

  getValue() {
    return this.randomiser.hammertime();
  }

}

/**
 * Timestamp Joker
 * @class Jokers.TimestampJoker
 * @extends Joker
 * @inheritdoc
 */
export class TimestampJoker extends Joker {

  static get name(){ return 'timestamp'; }

  getValue() {
    return this.randomiser.timestamp();
  }

}

/**
 * Timezone Joker
 * @class Jokers.TimezoneJoker
 * @extends Joker
 * @inheritdoc
 */
export class TimezoneJoker extends Joker {

  static get name(){ return 'timezone'; }

  getValue() {
    return this.randomiser.timezone();
  }

}