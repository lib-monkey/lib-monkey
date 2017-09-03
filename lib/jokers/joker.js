
export default class Joker {
  constructor(randomiser) {
    Object.assign(this, { randomiser });
  }

  get value() {
    return this.toString();
  }
  
}