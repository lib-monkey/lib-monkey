
import * as BasicJokers from '../jokers/basic';
import * as TextJokers from '../jokers/text';
import * as DateJokers from '../jokers/date';
import * as MultiJokers from "../jokers/multi";


export default class JokerFactoryGenerator {

  constructor(randomiser) {
    Object.assign(this, { randomiser });
  }

  _setupGetters(obj, jokers) {
    Object.keys(jokers)
      .map(className => jokers[className])
      .forEach(JokerClass => 
        Object.defineProperty(obj, JokerClass.name, {
          get: () => new JokerClass(this.randomiser)
        })
      );
  }

  create(obj){
    this._setupGetters(obj, BasicJokers);
    this._setupGetters(obj, TextJokers);
    this._setupGetters(obj, DateJokers);
    this._setupGetters(obj, MultiJokers);
  }
}