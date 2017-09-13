import Joker from '../jokers/joker';

class Runable {

  constructor(fn, params=[], ctx=null) {
    Object.assign(this, { fn, params, ctx });

    this.shouldCallback = fn && fn.length > params.length;
  }

  _extractParamValues() {
    return this.params.map(param => param instanceof Joker ? param.value : param);
  }

  call(extend={}) {
    let { fn, ctx } = this;
    let params = this._extractParamValues();

    return new Promise((resolve, reject) => {
      if(this.shouldCallback) {
        let callback = (err) => {
          if(err)
            reject({ err, params, extend, runable: this });
          resolve({ extend });
        };

        fn.apply(ctx, [...params, callback]);
      } else {
        try{
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
      }
    });    
  }

}


module.exports = Runable;