
import sinon from 'sinon';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Runable from '../lib/common/runable';
import FunctionRunner from '../lib/runner/function.runner';

describe('FunctionRunner', () => {

  it('Initialisation', () => {
    let runnable = { };
    expect(() => new FunctionRunner()).to.not.throw();
    expect(() => new FunctionRunner(runnable)).to.not.throw();
  });

  it('No Runner Should Throw', () => {
    let fnr = new FunctionRunner();
    expect(() => fnr.exec(0)).to.throw();
  });

  it('Sync Exec', () => {

    let runable = { call: sinon.spy() };

    let fnr = new FunctionRunner(runable);

    return fnr.exec(200).should.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(200));
  });

  it('Async Exec', () => {
    let runable = { call: sinon.stub().returns(Promise.resolve()) };

    let fnr = new FunctionRunner(runable);

    return fnr.exec(200, 10).should.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(200));
  });

  it('Assertion Error', () => {

    let rejectVaue = {
      err: new Error('Some Value'),
      params: [1, 2, 3],
      extend: { index: 0 }
    };

    let runable = { 
      call: sinon.stub().returns(
        Promise.reject(rejectVaue)
      ) 
    };

    let fnr = new FunctionRunner(runable);

    return fnr.exec(1).should.be.rejected
      .then(err => {
        expect(err.message).to.have.string(`Path: FunctionRunner(${rejectVaue.extend.index})`);
        expect(err.message).to.have.string(`Params: [${rejectVaue.params.join(', ')}]`);
      });

  });

  it('Internal Error', () => {
    let runable = { 
      call: sinon.stub().returns(
        Promise.reject(new Error('Things'))
      ) 
    };

    let fnr = new FunctionRunner(runable);

    return fnr.exec(1).should.be.rejectedWith(Error, 'Internal lib-monkey Error');
  });

  it('Immutability', () => {

    let fnr = new FunctionRunner();

    let newFnr = fnr.register([], () => {}, this);

    expect(fnr).to.not.equal(newFnr);
  });

});