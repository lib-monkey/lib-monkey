
import throat from 'throat';
import Runable from '../common/runable';

const mLayers = Symbol('layers');

export default class PipedRunner {

  constructor(...layers) {
    Object.assign(this, {
      [mLayers]: layers 
    });
  }

  params() {
    return {
      register: this.register.bind(this, Array.from(arguments))
    };
  }

  register(params, fn, ctx){
    let runnable = new Runable(fn, params, ctx);
    return new PipedRunner(...this[mLayers], runnable);
  }

  run(depth){
    let i = 0;
    let result;

    return Promise.all(
      this[mLayers].map(throat(1, runable => 
        runable
        .call(result, { depth, index: i++ })
        .then(({value}) => result = value)
      ))
    );
  }

  exec(cycles, concurrency=1){
    if(!this[mLayers] || this[mLayers].length === 0){
      throw new Error('No Runnables Registered please use fn.register()');
    }

    let i = 0;
    let queue = new Array(cycles).fill(index => this.run(index));

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
          err.message = err.message + `

            Path: PipedRunner(${extend.depth}:${extend.index}) 
            Params: [${params ? params.join(', ') : ''}]

          `;
          throw err;
        }
      });
  }

}