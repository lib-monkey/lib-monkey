
import sinon from 'sinon';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Runable from '../lib/common/runable';
import PipedRunner from '../lib/runner/piped.runner';

describe('PipedRunner', () => {

  it('Initialisation', () => {
    let runnable = { };
    expect(() => new PipedRunner()).to.not.throw();
    expect(() => new PipedRunner(runnable)).to.not.throw();
  });

  it('No Runner Should Throw', () => {
    let pnr = new PipedRunner();
    expect(() => pnr.exec(0)).to.throw();
  });

  it('Piped Execution', () => {
    let runable = { call: sinon.stub().returns(Promise.resolve({ value: null })) };

    let pnr = new PipedRunner(runable, runable);

    return pnr.exec(200).should.eventually.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(400));
  });

  it('Parallel Piped Execution', () => {
    let runable = { call: sinon.stub().returns(Promise.resolve({ value: null })) };

    let pnr = new PipedRunner(runable, runable);

    return pnr.exec(200, 10).should.eventually.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(400));
  });

  it('Piped Params', () => {
    let initialValue = '12';

    let runable = { call: sinon.stub().returns(Promise.resolve({ value: initialValue })) };
    let runable2 = { call: sinon.stub().returns(Promise.resolve({ value: null })) };

    let pnr = new PipedRunner(runable, runable2);

    return pnr.exec(1).should.eventually.be.fulfilled
      .then(() => assert(runable2.call.calledWith(initialValue), 'Value not passed to second runnable'));
  });

  it('Falsable Piped Params', () => {
    let values = [false, 0, null];

    return Promise.all(values.map(val => {
      let runable = { call: sinon.stub().returns(Promise.resolve({ value: val })) };
      let runable2 = { call: sinon.stub().returns(Promise.resolve({ value: null })) };

      let pnr = new PipedRunner(runable, runable2);

      return pnr.exec(1).should.eventually.be.fulfilled
        .then(() => assert(runable2.call.calledWith(val), `Value not passed to second runnable for ${val}`));
    }));
  });

  it('Piped Error', () => {
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

    let pnr = new PipedRunner(runable);

    return pnr.exec(1).should.eventually.be.rejected
      .then(err => {
        expect(err.message).to.have.string(`Path: PipedRunner(${rejectVaue.extend.depth}:${rejectVaue.extend.index})`);
        expect(err.message).to.have.string(`Params: [${rejectVaue.params.join(', ')}]`);
      });

  });

});