
import sinon from 'sinon';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Joker from '../lib/common/joker';
import Runable from '../lib/common/runable';

describe('Runnable', () => {

  it('Initialisation', () =>{
    expect(() => new Runable(sinon.spy())).to.not.throw();    
    expect(() => new Runable(sinon.spy(), [1, 2, 3])).to.not.throw();  
    expect(() => new Runable(sinon.spy(), [1, 2, 3], this)).to.not.throw();
  });

  it('Calling', () => {
    let fn = sinon.spy();
    let params = [1, 2, 3];
    let runable = new Runable(fn, params);

    runable.call().should.eventually.be.fulfilled
      .then(() => assert(fn.calledOnce));
  });

  it('Sync', () => {
    let params = [11];
    let returnValue = "Working";
    let fn = (value) => {
      expect(value).to.equal(params[0]);
      return returnValue;
    };

    let runable = new Runable(fn, params);
    return runable.call().should.eventually.have.property('value', returnValue);
  });

  it('Sync fail', () => {
    let params = [11];
    let fn = (value) => {
      expect(value).to.equal("something else");
    };

    let runable = new Runable(fn, params);
    return runable.call().should.eventually.be.rejected;
  });

  it('Promise Async', () => {
    let returnValue = 'Some Value';
    let fn = () => 
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue));
      });

    let runable = new Runable(fn);
    return runable.call().should.eventually.have.property('value', returnValue);
  });

  it('Promise Async Fail', () => {
    let fn = () => 
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Some Error')));
      });

    let runable = new Runable(fn);
    return runable.call().should.eventually.be.rejected;
  });

  it('Callback Async', () => {
    let returnValue = 'Some Value';
    let fn = (done) => {
      setTimeout(() => done(null, returnValue));
    };

    let runable = new Runable(fn);
    return runable.call().should.eventually.have.property('value', returnValue);
  });

  it('Callback Sync Fail', () => {
    let fn = (done) => { 
      throw new Error('Some assertion error');
    };

    let runable = new Runable(fn);
    return runable.call().should.eventually.be.rejected;
  });

  it('Callback Async Fail', () => {
    let fn = (done) => {
      setTimeout(() => done(new Error('Some assertion error')));
    };

    let runable = new Runable(fn);
    return runable.call().should.eventually.be.rejected;
  });

  it('Extract Joker Params', () => {
    let fakeChance = { bool: () => false };
    let joker_value = 'Some Value';
    let joker = new Joker(fakeChance);
    sinon.stub(joker, 'getValue').returns(joker_value);

    let params = [joker];
    let fn = sinon.spy();

    let runable = new Runable(fn, params);
    return runable.call()
      .should.eventually.be.fulfilled
      .then(() => assert(fn.calledWith(joker_value), 'Joker value wasn\'t called'));
  });

  it('Internal Error', () => {
    let fakeChance = { bool: () => false };
    let joker_value = 'Some Value';
    let joker = new Joker(fakeChance);
    sinon.stub(joker, 'getValue').throws(new Error('Hey'));

    let params = [joker];

    let runable = new Runable(() => {}, params);

    let extend = { hey: 'ho' };

    return runable.call(null, extend)
      .should.eventually.be.rejected
      .then(res => {
        expect(res).to.nested.include({'err.message': 'Hey'});
        expect(res.extend).to.deep.equal(extend);
      });
  });

});