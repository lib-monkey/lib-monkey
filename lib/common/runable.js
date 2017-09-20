import Joker from '../jokers/joker';

class Runable {

  constructor(fn, params=[], ctx=null) {
    Object.assign(this, { fn, params, ctx });

    this.shouldCallback = fn && fn.length > params.length;
  }

  _extractParamValues() {
    return this.params.map(param => param instanceof Joker ? param.value : param);
  }

  _callback_exec(fn, ctx, params, extend) {
    return new Promise((resolve, reject) => {
      let callback = (err) => {
        if(err)
          reject({ err, params, extend, runable: this });
        resolve({ extend });
      };

      try {
        fn.apply(ctx, [...params, callback]);
      } catch (err) {
        callback(err);
      }
    });
  }

  _regular_exec(fn, ctx, params, extend){
    return new Promise((resolve, reject) => {
      try {
        let res = fn.apply(ctx, params);

        if(res && 'then' in res && typeof res.then === 'function'){
          res.then(() => resolve({ extend }));

          if('catch' in res && typeof res.catch === 'function'){
            res.catch(err => reject({ err, params, extend, runable: this }));
          }
        } else {
          resolve({ extend });
        }
      } catch(err) {
        reject({ err, params, extend, runable: this });
      }
    });
  }

  call(extend={}) {
    let { fn, ctx } = this;
    try {
      let params = this._extractParamValues();
      
      if(this.shouldCallback)
        return this._callback_exec(fn, ctx, parmas, extend);
      else
        return this._regular_exec(fn, ctx, params, extend);
    } catch(err) {
      return Promise.reject({ err, extend, runable: this });
    }
  }

}


module.exports = Runable;