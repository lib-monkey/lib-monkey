
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