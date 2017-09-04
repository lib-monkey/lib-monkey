
export default class Joker {
  constructor(randomiser, options={}) {
    Object.assign(this, { randomiser, options });
    this._createModyfierFunctions();
  }

  _createModyfierFunctions(){
    this.modifiers.forEach(modifier => {
      this[modifier] = (value => { this.options[modifier] = value; return this; });
    });
  }

  get modifiers(){
    return [];
  }

  get value() {
    return this.toString();
  }
  
}