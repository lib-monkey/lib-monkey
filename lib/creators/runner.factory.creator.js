
import FunctionRunner from '../runner/function.runner';
import PipedRunner from '../runner/piped.runner';

const mRandomiser = Symbol('randomiser');

export default class JokerFactoryGenerator {

  constructor(randomiser) {
    Object.assign(this, { 
      [mRandomiser]: randomiser
    });
  }

  create(obj){
    Object.defineProperty(obj, 'fnr', {
      get: () => new FunctionRunner()
    });

    Object.defineProperty(obj, 'pnr', {
      get: () => new PipedRunner()
    });
  }
}