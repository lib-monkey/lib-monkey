
import throat from 'throat';

import Runner from '../common/runner';

const mRandomiser = Symbol('randomiser');

export default class ApiFacotryCreator {

  constructor(randomiser) {
    Object.assign(this, { 
      [mRandomiser]: randomiser
    });
  }

  create(obj){
    obj.it = (fn, ctx) => 
      new Runner(fn, ctx);

    obj.generate = (joker) => joker.value;

    return obj;
  }
}