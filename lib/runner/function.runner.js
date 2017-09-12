
import throat from 'throat';
import Runnable from './runable';

export default class FunctionRunner {

  constructor(randomiser) {
    Object.assign(this, { randomiser });

    this.runables = [];
  }

  _createQueue(cycles) {
    let queue = [];

    for(var i = 0; i < cycles; i++){
      queue.push(...this.randomiser.shuffle(this.runables));
    }

    this.randomiser.shuffle(queue);
    return queue;
  }

  register(){
    let fn = arguments[0];

    if(typeof fn !== 'function'){
      throw new Error('Function Not Provided');
    }

    let params = [];

    for( let i = 1; i < arguments.length; i++ ){
      params.push(arguments[i]);
    }

    this.runables.push(new Runnable(fn, params));
    return this;
  }

  exec(cycles, concurrency=1) {
    return Promise.all(
      this._createQueue(cycles)
        .map(throat(concurrency, runable => runable.call()))
    );
  }
}