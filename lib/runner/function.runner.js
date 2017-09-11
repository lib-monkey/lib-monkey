
import Joker from '../jokers/joker';

export default class FunctionRunner {

  constructor(randomiser) {
    Object.assign(this, { randomiser });

    this.functions = [];
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

    this.functions.push(() => 
      fn.apply(null, params.map(param => param instanceof Joker ? param.value : param)));
    return this;
  }

  exec(cycles) {
    let queue = [];

    for(var i = 0; i < cycles; i++){
      queue.push(...this.randomiser.shuffle(this.functions));
    }

    this.randomiser.shuffle(queue);

    queue.forEach(item => item.call());
  }

}