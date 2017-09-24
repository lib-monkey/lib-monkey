
import * as BasicJokers from './basic';
import * as TextJokers from './text';
import * as DateJokers from './date';
import * as MultiJokers from "./multi";

export default class JokerFactory {

  constructor(randomiser) {
    Object.assign(this, { randomiser });

    this._setupGetters(BasicJokers);
    this._setupGetters(TextJokers);
    this._setupGetters(DateJokers);
    this._setupGetters(MultiJokers);
  }

  _setupGetters(jokers) {
    Object.keys(jokers)
      .forEach(jockerName => 
        Object.defineProperty(this, jockerName, {
          get: () => new (jokers[jockerName])(this.randomiser)
        })
      );
  }
} 
