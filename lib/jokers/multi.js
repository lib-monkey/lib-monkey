
import Joker from '../common/joker';

/**
 * Pick Joker, Picks at random from an array
 * @class Jokers.PickJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.PickJoker#of
 * @function
 * @memberof Jokers.PickJoker
 * @description The Array to pick from
 * @param {any[]} value
 * @returns {Joker} self
 */
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

/**
 * Array Joker, Creates array from template or description
 * @class Jokers.ArrayJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.ArrayJoker#count
 * @function
 * @memberof Jokers.ArrayJoker
 * @description Set lenght of the array
 * @param {number} value
 * @returns {Joker} self
 */ 
 /**
 * @name Jokers.ArrayJoker#of
 * @function
 * @memberof Jokers.ArrayJoker
 * @description The value with what to fill the array (if joker passed it will be extracted)
 * @param {any} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.ArrayJoker#from
 * @function
 * @memberof Jokers.ArrayJoker
 * @description Create array from a pre-determened structure
 * @param {any[]} value
 * @returns {Joker} self
 */
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

/**
 * Map Joker, Creates a map from template
 * @class Jokers.MapJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.MapJoker#of
 * @function
 * @memberof Jokers.MapJoker
 * @description Template for the map
 * @param {any[]} value
 * @returns {Joker} self
 */
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

/**
 * Object Joker, Like the Map but recurcive. (Caution may get into an infinite loop haha)
 * @class Jokers.ObjectJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.ObjectJoker#of
 * @function
 * @memberof Jokers.ObjectJoker
 * @description Template for the Object
 * @param {any[]} value
 * @returns {Joker} self
 */
export class ObjectJoker extends Joker {

  static get name() { return 'object'; }

  get modifiers() {
    return ['of'];
  }

  _evaluateLayer(layer){
    return Object.keys(layer)
      .reduce((acc, key) => {
        let value = layer[key];
        if(value instanceof Joker){
          acc[key] =  value.value;
        } else if(typeof value === 'object'){
          acc[key] = this._evaluateLayer(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
  }

  getValue() {
    let template = this.options.of;

    if(!template){
      throw new Error('Template not provided please use monkey.map.of({ a: 1, .... })');
    }

    return  this._evaluateLayer(template);
  }
}

/**
 * Typed Joker, Creates Specific type
 * @class Jokers.TypedJoker
 * @extends Joker
 * @inheritdoc
 */
 /**
 * @name Jokers.TypedJoker#of
 * @function
 * @memberof Jokers.TypedJoker
 * @description Type to create
 * @param {type} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.TypedJoker#params
 * @function
 * @memberof Jokers.TypedJoker
 * @description Params to pass the Type's constructor
 * @param {type} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.TypedJoker#init
 * @function
 * @memberof Jokers.TypedJoker
 * @description Init function if needed, currently syncronus
 * @param {type} value
 * @returns {Joker} self
 */
 /**
 * @name Jokers.TypedJoker#initWith
 * @function
 * @memberof Jokers.TypedJoker
 * @description Params to pass the init function
 * @param {type} value
 * @returns {Joker} self
 */
export class TypedJoker extends Joker {
  
  static get name() { return 'typed'; }

  get modifiers() {
    return ['of', 'params', 'init', 'initWith'];
  }

  getValue() {
    let { of: Type, params, init, initWith } = this.options;

    if(!Type && !init){
      throw new Error('Sorry but no constructor registered please use monkey.typed.type(...)');
    }

    if(!params)
      params = [];

    let instance = undefined;

    if(Type){
      instance = new Type(...params.map(param => param instanceof Joker ? param.value : param))
    }

    if(init && typeof init === 'function'){ // TODO: Add async Init option

      if(!initWith)
        initWith = [];

      if(instance)
        var res = init(instance, ...initWith.map(param => param instanceof Joker ? param.value : param));
      else
        var res = init(...initWith.map(param => param instanceof Joker ? param.value : param));

      return !Type || res instanceof Type ? res : instance;
    } else {
      return instance;      
    }
  }

}