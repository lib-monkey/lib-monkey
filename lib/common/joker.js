
const mNullable = Symbol('nullable');
const mRandomiser = Symbol('randomiser');
const mOptions = Symbol('options');

export default class Joker {
  /**
   * @constructor Joker
   * @param {chacne} randomiser - Chance's randomiser.
   * @param {object} options - preconfigured options for the Joker
   */
  constructor(randomiser, options={}) {
    Object.assign(this, { 
      [mRandomiser]: randomiser, 
      [mOptions]: options, 
      [mNullable]: 0
    });

    this._createModyfierFunctions();
  }

  _createModyfierFunctions(){
    this.modifiers.forEach(modifier => {
      this[modifier] = (value => {
        this[mOptions][modifier] = value;
        return this;
      });
    });
  }

  get randomiser() {
    return this[mRandomiser];
  }

  get options() {
    return this[mOptions];
  }

  get modifiers(){
    return [];
  }

  get value() {
    return this.randomiser.bool({ likelihood: this[mNullable] }) ? null : this.getValue();
  }

  getValue() {
    return this.toString();
  }

  nullable(value=true) {
    if(!value){
      this[mNullable] = 0;
    } else if (value && ( value === true || isNaN(value) )){
      this[mNullable] = 50;
    } else {
      this[mNullable] = value;
    }
    return this;
  }
  
}