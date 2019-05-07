
import throat from 'throat';
import Runable from './runable';

const mRunnerName = Symbol('runnerName');
const mRunnable = Symbol('runable');

/**
 * Base runner.
 */
class Runner {

  constructor(...params) {
    if (typeof params[0] === 'string') {
      this[mRunnerName] = params[0];
      params = params.slice(1);
    }

    if (!params[0]) {
      throw new Error('Runner Must be Inintialized with Runnable or a function')
    }

    if (typeof params[0] === 'function'){
      this[mRunnable] = new Runable(...params)
    } else if (params[0] instanceof Runable) {
      this[mRunnable] = params[0]
    }
  }

  /**
   * If there is an asserion error, this should the the added message to the error
   * @abstract
   * @param {any[]} params - the params passed to the executed function
   * @param {object} extend - extend object passed to the runnable
   * @param {Runnable} runnable - the instance of the runnable that was executed
   * @return {string}
   */
  asertionErrorMessage(extend, runnable) {
    return `
      ${this[mRunnerName] || 'Runner'} [${extend.index}]
    `;
  }

  /**
   * Execute the runner and return a promise representing the test run
   * @param {number} cycles - the amount of cycles that should be executed
   * @param {number} concurrency - amoun of cuncurrent runnables that can run in parallel
   * @return {Promise}
   */
  do(cycles, concurrency=1) {
    let i = 0;
    let queue = new Array(cycles).fill(index => this[mRunnable].call(undefined, { index }))

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
          let { err, extend, runnable } = error;
          err.message = err.message + this.asertionErrorMessage(extend, runnable);
          throw err;
        }
      });
  }
}

export default Runner;