
import sinon from 'sinon';
import Chance from 'chance';
import { expect, assert } from 'chai';

import Joker from '../lib/common/joker';
import Runner from '../lib/common/runner';

import ApiFactoryGenerator from '../lib/creators/api.factory.creator';
import JokerFactoryGenerator from '../lib/creators/joker.factory.creator';

const Randomizer = new Chance();

describe('Creators', () => {

  describe('Joker', () => {

    it('Init', () => {

      expect(() => new JokerFactoryGenerator()).to.not.throw();
      expect(() => new JokerFactoryGenerator(Randomizer)).to.not.throw();

    });

    it('Create will fill Jokers', () => {

      let factory = {};
      let jfg = new JokerFactoryGenerator(Randomizer);

      jfg.create(factory);

      let getters = Object.entries(Object.getOwnPropertyDescriptors(factory))
        .filter(([key, descriptor]) => typeof descriptor.get === 'function')
        .map(([key]) => key)

      getters.forEach(getter => {

        expect(factory[getter]).to.be.instanceOf(Joker);

      });

    });

  });

  describe('Runners', () => {

    it('Init', () => {

      expect(() => new ApiFactoryGenerator()).to.not.throw();
      expect(() => new ApiFactoryGenerator(Randomizer)).to.not.throw();

    });

    it('Create will fill Runners', () => {

      let factory = {};
      let jfg = new ApiFactoryGenerator(Randomizer);

      jfg.create(factory);

      let getters = Object.entries(Object.getOwnPropertyDescriptors(factory))
        .filter(([key, descriptor]) => typeof descriptor.get === 'function')
        .map(([key]) => key)

      getters.forEach(getter => {

        expect(factory[getter]).to.be.instanceOf(Runner);

      });

    });

  });

});