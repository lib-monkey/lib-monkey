
import throat from 'throat';
import Runable from '../common/runable';

export default class Runner {

  params() {
    return {
      register: this.register.bind(this, Array.from(arguments))
    };
  }

   register(params, fn, ctx) {
    if(typeof params === 'function'){
      [fn, params, ctx] = [params, undefined, fn]; // Rewrite the params if params is not provided
    }
    let runnable = new Runable(fn, params, ctx);
    return this.withRunable(runnable);
  }

  withRunable(runable) {
    throw new Error('Not Implemted');
  }

  asertionErrorMessage(params, extend, runnable) {
    return '';
  }

  exec(cycles, concurrency=1) {
    let i = 0;
    let queue = this.createRunQueue(cycles);

    return Promise.all(
        queue.map(throat(concurrency, fn => fn(i++)))
      )
      .catch(error => {
        if(error instanceof Error) {
          error.message = error.message + `

            Internal lib-monkey Error, if you dont mind open an issue =]

          `;
          throw error;
        } else {
          let { err, params, extend, runnable } = error;
          err.message = err.message + this.asertionErrorMessage(params, extend, runnable);
          throw err;
        }
      });
  }

}