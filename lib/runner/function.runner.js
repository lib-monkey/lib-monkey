
import throat from 'throat';
import Runner from '../common/runner';

const mRandomiser = Symbol('randomiser');
const mRunnable = Symbol('runnable');

class FunctionRunner extends Runner {

  constructor(runnable) {
    super();
    Object.assign(this, {
      [mRunnable]: runnable 
    });
  }

  withRunable(runnable){
    return new FunctionRunner(runnable);
  }

  createRunQueue(cycles) {
    if(!this[mRunnable]){
      throw new Error('No Runnable Registered please use fn.register()');
    }

    return new Array(cycles).fill(index => this[mRunnable].call(undefined, { index }));
  }

   asertionErrorMessage(params, extend, runnable) {
    return `

      Path: FunctionRunner(${extend.index}) 
      Params: [${params ? params.join(', ') : ''}]

    `;
  }
}

export default FunctionRunner;