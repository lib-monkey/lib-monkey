
import throat from 'throat';
import Runable from '../common/runable';

const mRandomiser = Symbol('randomiser');
const mRunnable = Symbol('runnable');

export default class FunctionRunner {

  constructor(randomiser, runnable) {
    Object.assign(this, { 
      [mRandomiser]: randomiser, 
      [mRunnable]: runnable });
  }

  params() {
    return { 
      register: this.register.bind(this, Array.from(arguments))
    };
  }

  register(params, fn, ctx){
    let runnable = new Runable(fn, params, ctx);
    return new FunctionRunner(this[mRandomiser], runnable);
  }

  exec(cycles, concurrency=1) {
    if(!this[mRunnable]){
      throw new Error('No Runnable Registered please use fn.register()');
    }
    let i = 0;
    let queue = new Array(cycles).fill(this[mRunnable]);

    return Promise.all(
        queue.map(throat(concurrency, runable => runable.call({ index: i++ })))
      )
      .catch(error => {
        if(error instanceof Error) {
          error.message = error.message + `

            Internal lib-monkey Error, if you dont mind open an issue =]

          `;
          throw error;
        } else {
          let { err, params, extend, runnable } = error;
          err.message = err.message + `

            Path: FunctionRunner(${extend.index}) 
            Params: [${params.join(', ')}]

          `;
          throw err;
        }
      });
  }
}