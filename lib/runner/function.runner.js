
import throat from 'throat';
import Runable from '../common/runable';

export default class FunctionRunner {

  constructor(randomiser, runnable) {
    Object.assign(this, { randomiser, runnable });
  }

  params() {
    return { 
      register: this.register.bind(this, Array.from(arguments))
    };
  }

  register(params, fn, ctx){
    let runnable = new Runable(fn, params, ctx);
    return new FunctionRunner(this.randomiser, runnable);
  }

  exec(cycles, concurrency=1) {
    if(!this.runnable){
      throw new Error('No Runnable Registered please use fn.register()');
    }
    let i = 0;
    let queue = new Array(cycles).fill(this.runnable);

    return Promise.all(
        queue.map(throat(concurrency, runable => runable.call({ index: i++ })))
      )
      .catch(({ err, params, runable, extend }) => {
        err.message = err.message + `

          Path: FunctionRunner(${extend.index}) 
          Params: [${params.join(', ')}]

        `;
        throw err;
      });
  }
}