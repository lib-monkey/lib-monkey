
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

  it('Sync Pipe', () => {
    let runable = { call: sinon.spy() };

    let pnr = new PipedRunner(runable, runable);

    return pnr.exec(200).should.be.fulfilled
      .then(() => expect(runable.call.callCount).to.equal(400));
  });

});