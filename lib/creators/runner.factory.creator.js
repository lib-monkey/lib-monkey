
import FunctionRunner from '../runner/function.runner';

export default class JokerFactoryGenerator {

  constructor(randomiser) {
    Object.assign(this, { randomiser });
  }

  create(object){
    Object.defineProperty(object, 'fn', {
      get: () => new FunctionRunner(this.randomiser)
    });
  }
}