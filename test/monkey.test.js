
import sinon from 'sinon';
import { expect, assert } from 'chai';

import Chance from 'chance';

const __requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

describe('Monkey', () => {

  before(() => {
    process.env.LIB_MONKEY_ART = 0;
  });

  it('Regular Initialisation', () => {

    const monkey = __requireUncached('../lib/monkey');

    expect(monkey).to.have.property('randomiser');
    expect(monkey).to.have.property('ApiCreator');
    expect(monkey).to.have.property('JokerCreator');
  });

  it('Random Seed for Randmosizer', () => {

    delete process.env.LIB_MONKEY_SEED;

    const monkey = __requireUncached('../lib/monkey');

    expect(monkey.randomiser).to.be.instanceOf(Chance);
  });

  it('Ready Seed for Randmosizer', () => {

    let seed = '123123';

    let testRandomiser = new Chance(seed);

    process.env.LIB_MONKEY_SEED = seed;

    const monkey = __requireUncached('../lib/monkey');

    expect(monkey.randomiser.integer()).to.be.equal(testRandomiser.integer());
  });

});