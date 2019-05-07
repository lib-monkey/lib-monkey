
import sinon from 'sinon';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Joker from '../lib/common/joker';
import Runable from '../lib/common/runable';

describe('Runnable', () => {

  it('Initialisation', () =>{
    expect(() => new Runable()).to.throw();    
    expect(() => new Runable(sinon.spy())).to.not.throw();    
    expect(() => new Runable(sinon.spy(), [1, 2, 3])).to.not.throw();  
    expect(() => new Runable(sinon.spy(), [1, 2, 3], this)).to.not.throw();
  });

  it('Calling', () => {
    let fn = sinon.spy();
    let runable = new Runable(fn);

    runable.call().should.eventually.be.fulfilled
      .then(() => assert(fn.calledOnce));
  });

  it('Broken Call Fail', () => {
    let fn = { call() { throw Error('lol') } };

    let runable = new Runable(fn);
    return runable.call().should.eventually.be.rejected;
  });

  it('Sync', () => {
    let returnValue = "Working";
    let fn = () => {
      return returnValue;
    };

    let runable = new Runable(fn);
    return runable.call().should.eventually.have.property('value', returnValue);
  });

  it('Sync fail', () => {
    let fn = () => {
      expect('asd').to.equal("something else");
    };

    let runable = new Runable(fn);
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

  it('Returned Args', () => {
    let someValue = 'Some Value';
    let fn = sinon.stub().returns(someValue);

    let runable = new Runable(fn);
    return runable.call()
      .should.eventually.have.property('value', someValue);
  });

});