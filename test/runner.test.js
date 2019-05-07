
import sinon from 'sinon';
import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import Runable from '../lib/common/runable';
import Runner from '../lib/common/runner';

describe('Runner', () => {

  it('Initialisation', () => {
    let runnable = { };
    expect(() => new Runner()).to.throw();
    expect(() => new Runner(runnable)).to.not.throw();
  });

  it('Sync do', () => {

    let runable = sinon.spy();

    let fnr = new Runner(runable);

    return fnr.do(200).should.be.fulfilled
      .then(() => expect(runable.callCount).to.equal(200));
  });

  it('Async do', () => {
    let runable = sinon.stub().returns(Promise.resolve());

    let fnr = new Runner(runable);

    return fnr.do(200, 10).should.be.fulfilled
      .then(() => expect(runable.callCount).to.equal(200));
  });

  it('Assertion Error', () => {

    let rejectVaue = {
      err: new Error('Some Value'),
      extend: { index: 0 }
    };

    let runable = sinon.stub().returns(
      Promise.reject(rejectVaue)
    );

    let fnr = new Runner(runable);

    return fnr.do(1).should.be.rejected
      .then(err => {
        expect(err.message).to.have.string(`Path: Runner(${rejectVaue.extend.index})`);
      });
  });

});