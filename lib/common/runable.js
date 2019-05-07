import Joker from './joker';

const mFn = Symbol('fn');
const mCtx = Symbol('ctx');

class Runable {

  constructor(fn, ctx=null) {
    if (!fn)
      throw new Error('Cannot create Runable without context');
  
    Object.assign(this, { 
      [mFn]: fn, 
      [mCtx]: ctx 
    });
  }

  _callback_exec(fn, ctx, extend) {
    return new Promise((resolve, reject) => {
      let callback = (err, value) => {
        if(err)
          reject({ err, extend, runable: this });
        resolve({ value, extend });
      };

      try {
        fn.call(ctx, callback);
      } catch (err) {
        callback(err);
      }
    });
  }

  _regular_exec(fn, ctx, extend){
    return new Promise((resolve, reject) => {
      try {
        let res = fn.call(ctx);

        if(res && res.then && typeof res.then === 'function'){
          res
            .then(value => resolve({ value, extend }))
            .catch(err => reject({ err, extend, runable: this }));
        } else {
          resolve({ value: res, extend });
        }
      } catch(err) {
        reject({ err, extend, runable: this });
      }
    });
  }

  call(param, extend={}) {
    let { [mFn]: fn, [mCtx]: ctx } = this;

    if(fn && fn.length)
      return this._callback_exec(fn, ctx, extend);
    else
      return this._regular_exec(fn, ctx, extend);
  }

}


export default Runable;