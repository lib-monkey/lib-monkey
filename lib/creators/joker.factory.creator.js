
import * as BasicJokers from '../jokers/basic';
import * as TextJokers from '../jokers/text';
import * as DateJokers from '../jokers/date';
import * as MultiJokers from "../jokers/multi";


export default class JokerFactoryGenerator {

  constructor(randomiser) {
    Object.assign(this, { randomiser });
  }

  _setupGetters(object, jokers) {
    Object.keys(jokers)
      .forEach(className => 
        Object.defineProperty(object, jokers[className].name, {
          get: () => new (jokers[className])(this.randomiser)
        })
      );
  }

  create(object){
    this._setupGetters(object, BasicJokers);
    this._setupGetters(object, TextJokers);
    this._setupGetters(object, DateJokers);
    this._setupGetters(object, MultiJokers);
  }
}