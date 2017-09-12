import Joker from '../jokers/joker';

class Runnable {

  constructor(fn, params, ctx=null) {
    Object.assign(this, { fn, params, ctx });

    this.shouldCallback = fn && fn.length > params.length;
  }

  _extractParamValues() {
    return this.params.map(param => param instanceof Joker ? param.value : param);
  }

  call() {
    let { fn, ctx } = this;
    let params = this._extractParamValues();

    return new Promise((resolve, reject) => {
      if(this.shouldCallback) {
        let callback = (err) => {
          if(err)
            reject(err);
          resolve();
        };

        fn.apply(ctx, [...params, callback]);
      } else {

        let res = fn.apply(ctx, params);

        if(res && 'then' in res && typeof res.then === 'function'){
          res.then(() => resolve());

          if('catch' in res && typeof res.catch === 'function'){
            res.catch(reject);
          }
        } else {
          resolve();
        }

      }
    });    
  }

}


module.exports = Runnable;