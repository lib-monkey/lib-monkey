import Joker from './joker';

const mFn = Symbol('fn');
const mParams = Symbol('params');
const mCtx = Symbol('ctx');

class Runable {

  constructor(fn, params=[], ctx=null) {
    Object.assign(this, { 
      [mFn]: fn, 
      [mParams]: params, 
      [mCtx]: ctx 
    });
  }

  _extractParamValues() {
    return this[mParams].map(param => param instanceof Joker ? param.value : param);
  }

  _callback_exec(fn, ctx, params, extend) {
    return new Promise((resolve, reject) => {
      let callback = (err, value) => {
        if(err)
          reject({ err, params, extend, runable: this });
        resolve({ value, extend });
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

        if(res && res.then && typeof res.then === 'function'){
          res
            .then(value => resolve({ value, extend }))
            .catch(err => reject({ err, params, extend, runable: this }));
        } else {
          resolve({ value: res, extend });
        }
      } catch(err) {
        reject({ err, params, extend, runable: this });
      }
    });
  }

  call(param, extend={}) {
    try {  
      let { [mFn]: fn, [mCtx]: ctx } = this;
      let params = this._extractParamValues();
      if(arguments.length > 0 && param !== undefined)
        params = [param, ...params];

      if(fn && fn.length > params.length)
        return this._callback_exec(fn, ctx, params, extend);
      else
        return this._regular_exec(fn, ctx, params, extend);
    } catch(err) {
      return Promise.reject({ err, extend });
    }
  }

}


module.exports = Runable;