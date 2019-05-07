
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

    const monkeyCreator = __requireUncached('../lib/monkey');

    expect(monkeyCreator).to.have.property('randomiser');
    expect(monkeyCreator).to.have.property('ApiCreator');
    expect(monkeyCreator).to.have.property('JokerCreator');
  });

  it('Random Seed for Randmosizer', () => {

    delete process.env.LIB_MONKEY_SEED;

    const monkeyCreator = __requireUncached('../lib/monkey');

    expect(monkeyCreator.randomiser).to.be.instanceOf(Chance);
  });

  it('Ready Seed for Randmosizer', () => {

    let seed = '123123';

    let testRandomiser = new Chance(seed);

    process.env.LIB_MONKEY_SEED = seed;

    const monkeyCreator = __requireUncached('../lib/monkey');

    expect(monkeyCreator.randomiser.integer()).to.be.equal(testRandomiser.integer());
  });

  it('Monkey Creation Flow', () => {
    let monkey = { };

    const { ApiCreator, JokerCreator } = __requireUncached('../lib/monkey');

    ApiCreator.create(monkey);
    JokerCreator.create(monkey);

    expect(monkey).to.have.property('it');
    expect(monkey).to.have.property('generate');
  });

  describe('Monkey Useage', () => {
    let monkey = {};

    before(() => {
      const { ApiCreator, JokerCreator } = __requireUncached('../lib/monkey');

      ApiCreator.create(monkey);
      JokerCreator.create(monkey);
    });

    it('Generate Result', () => {
      const value = monkey.generate(monkey.int.min(0).max(10));

      expect(value).to.be.above(0);
      expect(value).to.be.below(10);
    });

    it('Monkey Test', () => 
      monkey.it(() => {
        const value = monkey.generate(monkey.natural.max(10));

        expect(value).to.be.above(0);
        expect(value).to.be.below(10);
      })
        .do(5));


  })

});