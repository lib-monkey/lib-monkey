
import FunctionRunner from '../runner/function.runner';

export default class JokerFactoryGenerator {

  constructor(randomiser) {
    Object.assign(this, { randomiser });
  }

  create(obj){
    Object.defineProperty(obj, 'fnr', {
      get: () => new FunctionRunner(this.randomiser)
    });
  }
}