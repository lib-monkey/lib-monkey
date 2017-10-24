
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
    let runable = { call: sinon.stub().returns(new Promise((resolve) => resolve({ value: null }))) };

    let pnr = new PipedRunner(runable, runable);

    return pnr.exec(200).should.eventually.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(400));
  });

  it('Parallel Piped Execution', () => {
    let runable = { call: sinon.stub().returns(new Promise((resolve) => resolve({ value: null }))) };

    let pnr = new PipedRunner(runable, runable);

    return pnr.exec(200, 10).should.eventually.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(400));
  });

});