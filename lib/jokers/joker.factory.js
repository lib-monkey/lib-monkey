
import * as Basic from './basic';

export default class JokerFactory {

  constructor(randomiser) {
    Object.assign(this, { randomiser });

    this._setupGetters(Basic);    
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
