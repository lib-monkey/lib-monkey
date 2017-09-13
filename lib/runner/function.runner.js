
import throat from 'throat';
import Runable from '../common/runable';

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

  get register() {
    let _this = this;
    return {
      params() {
        return { eval: _this.eval.bind(_this, Array.from(arguments)) };
      }
    };
  }

  eval(params, fn){
    this.runables.push(new Runable(fn, params));
    return this;
  }

  exec(cycles, concurrency=1) {
    let i = 0;
    let queue = this._createQueue(cycles);

    return Promise.all(queue.map(throat(concurrency, runable => runable.call({ index: i++ }))))
      .catch(({ err, params, runable, extend }) => {
        err.message = err.message + `

          Path: FunctionRunner(${extend.index}) 
          Params: [${params.join(', ')}]

        `;
        throw err;
      });
  }
}