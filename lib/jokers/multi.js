
import Joker from '../common/joker';

export class PickJoker extends Joker {

  static get name(){ return 'pick'; }

  get modifiers() {
    return ['of'];
  }

  getValue() {
    let option = this.options.of;
    if(!option || !Array.isArray(option) || option.length === 0)
      throw new Error('No options added for the Joker, please use "of" modyfier');
    
    let value = this.randomiser.pickone(option);
    return value instanceof Joker ? value.value : value;
  }

}

export class ArrayJoker extends Joker {

  static get name() { return 'array'; }

  get modifiers() {
    return ['count', 'of', 'from'];
  }

  getValue() {
    let option = this.options.of;
    let { count, from } = this.options;

    if(!!from && Array.isArray(from)){
      return Array.from(from)
        .map(value => value instanceof Joker ? value.value : value);
    } else {
      return Array(count instanceof Joker ? count.value : count)
        .fill()
        .map(() => option instanceof Joker ? option.value : option);  
    }
  }

}

export class MapJoker extends Joker {

  static get name() { return 'map'; }

  get modifiers() {
    return ['of'];
  }

  getValue() {
    let template = this.options.of;

    if(!template){
      throw new Error('Template not provided please use monkey.map.of({ a: 1, .... })');
    }

    return Object.keys(template)
      .reduce((acc, key) => {
        let value = template[key];
        acc[key] = value instanceof Joker ? value.value : value;
        return acc;
      }, {});
  }
  
}