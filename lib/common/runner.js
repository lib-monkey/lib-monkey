
import throat from 'throat';
import Runable from '../common/runable';


/**
 * Base Class for the runners.
 */
class Runner {

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

  /**
   * Should create the execution quque before execution
   * @abstract
   * @param {number} cycles - the amount of cycles that should be executed
   * @return {function[]} - self
   */
  createRunQueue(cycles) {
      throw new Error('Not Implemted'); 
  }

  /**
   * Should register the runnable created in the Runner.register function
   * @abstract
   * @param {Runable} runable - runnable from Runner.register
   * @see Runner#register
   * @return {Runner} - self
   */
  withRunable(runable) {
    throw new Error('Not Implemted');
  }

  /**
   * If there is an asserion error, this should the the added message to the error
   * @abstract
   * @param {any[]} params - the params passed to the executed function
   * @param {object} extend - extend object passed to the runnable
   * @param {Runnable} runnable - the instance of the runnable that was executed
   * @return {string}
   */
  asertionErrorMessage(params, extend, runnable) {
    return '';
  }

  /**
   * Execute the runner and return a promise representing the test run
   * @param {number} cycles - the amount of cycles that should be executed
   * @param {number} concurrency - amoun of cuncurrent runnables that can run in parallel
   * @return {Promise}
   */
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

export default Runner;