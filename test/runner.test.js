
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
    let runable_cb = sinon.spy();
    let fnr = new Runner(runable_cb);

    return fnr.do(200).should.be.fulfilled
      .then(() => expect(runable_cb.callCount).to.equal(200));
  });

  it('Async do', () => {
    let runable_cb = sinon.stub().returns(Promise.resolve());
    let fnr = new Runner(runable_cb);

    return fnr.do(200, 10).should.be.fulfilled
      .then(() => expect(runable_cb.callCount).to.equal(200));
  });

  it('Ready Runner', () => {
    let runable_cb = sinon.stub();
    let runable = new Runable(runable_cb);

    let fnr = new Runner(runable);

    return fnr.do(200, 10).should.be.fulfilled
      .then(() => expect(runable_cb.callCount).to.equal(200));
  })

  it('Assertion Error', () => {

    let rejectVaue = {
      err: new Error('Some Value'),
      extend: { index: 0 }
    };

    let runable_cb = sinon.stub().returns(
      Promise.reject(rejectVaue)
    );

    let fnr = new Runner(runable_cb);

    return fnr.do(1).should.be.rejected
      .then(err => {
        expect(err.message).to.have.string(`Runner [${rejectVaue.extend.index}]`);
      });
  });


  it('Named Assertion Error', () => {

    const runnerName = 'Foo Test';

    let rejectVaue = {
      err: new Error('Some Value'),
      extend: { index: 0 }
    };

    let runable_cb = sinon.stub().returns(
      Promise.reject(rejectVaue)
    );

    let fnr = new Runner(runnerName, runable_cb);

    return fnr.do(1).should.be.rejected
      .then(err => {
        expect(err.message).to.have.string(`${runnerName} [${rejectVaue.extend.index}]`);
      });
  });

});