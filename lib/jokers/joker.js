
export default class Joker {
  constructor(randomiser, options={}) {
    Object.assign(this, { randomiser, options, _nullable: 0 });
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
    return this.randomiser.bool({ likelihood: this._nullable }) ? null : this.getValue();
  }

  getValue() {
    return this.toString();
  }

  nullable(value=true) {
    if(!value){
      this._nullable = 0;
    } else if (value && isNaN(value)){
      this._nullable = 50;
    } else {
      this._nullable = value;
    }
    return this;
  }
  
}