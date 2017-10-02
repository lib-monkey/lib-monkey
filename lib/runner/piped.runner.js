
import throat from 'throat';
import Runner from '../common/runner';

const mLayers = Symbol('layers');

export default class PipedRunner extends Runner {

  constructor(...layers) {
    super();
    Object.assign(this, {
      [mLayers]: layers 
    });
  }

  withRunable(runnable){
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

  createRunQueue(cycles){
    if(!this[mLayers] || this[mLayers].length === 0){
      throw new Error('No Runnables Registered please use fn.register()');
    }

    return new Array(cycles).fill(index => this.run(index));
  }

  asertionErrorMessage(params, extend, runnable) {
    return `

      Path: PipedRunner(${extend.depth}:${extend.index}) 
      Params: [${params ? params.join(', ') : ''}]

    `;
  }
}