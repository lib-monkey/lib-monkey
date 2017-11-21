

import sinon from 'sinon';
import { expect, assert } from 'chai';
import Joi from 'joi';
import Chance from 'chance';

import Joker from '../lib/common/joker';
import * as Multi from '../lib/jokers/multi';

const randomizer = new Chance();

describe('Complex Jokers', () => {

  describe('Pick', () => {

    it('Standard Array', () => {

      const array = ['value1', 'value2', 'value3'];

      const joker = new Multi.PickJoker(randomizer, {
        of: array
      });

      expect(array).to.include(joker.value);
    });

    it('Array With Jokers', () => {

      const testJoker = new Joker(randomizer);

      testJoker.getValue = () => 'value3';

      const array = ['value1', 'value2', testJoker];

      const joker = new Multi.PickJoker(randomizer, {
        of: array
      });

      for(let i = 0; i < 20; i++){
        expect(joker.value).to.not.be.instanceOf(Joker);
      }
    });

    it('Empty Selection', () => {

      const joker = new Multi.PickJoker(randomizer);

      expect(() => joker.value).to.throw();

    });

  });

  describe('Array', () => {

    describe('Iterative', () => {

      it('Random value', () => {

        let iteration = 0;

        const testJoker = new Joker(randomizer);

        testJoker.getValue = () => iteration++;

        const joker = new Multi.ArrayJoker(randomizer, {
          of: testJoker,
          count: 5
        });

        expect(joker.value).to.deep.equal([0, 1, 2, 3, 4]);

      });

      it('Random length', () => {

        const testJoker = new Joker(randomizer);
        testJoker.getValue = () => 3;

        const joker = new Multi.ArrayJoker(randomizer, {
          of: 0,
          count: testJoker
        });

        expect(joker.value).to.deep.equal([0, 0, 0]);

      });

    });

    it('Templated', () => {

      const testJoker = new Joker(randomizer);
      testJoker.getValue = () => 7;

      const joker = new Multi.ArrayJoker(randomizer, {
        from: [1, testJoker, 2]
      });

      expect(joker.value).to.deep.equal([1, 7, 2]);

    });

  });

  describe('Map', () => {

    it('Templated', () => {

      const testJoker = new Joker(randomizer);
      testJoker.getValue = () => 7;

      const joker = new Multi.MapJoker(randomizer, {
        of: {
          a: 1,
          b: 3,
          c: testJoker
        }
      });

      expect(joker.value).to.deep.equal({
        a: 1,
        b: 3,
        c: 7
      });

    });

    it('Empty Selection', () => {

      const joker = new Multi.MapJoker(randomizer);

      expect(() => joker.value).to.throw();

    });

  });

  describe('Map', () => {

    it('Templated', () => {

      const testJoker = new Joker(randomizer);
      testJoker.getValue = () => 7;

      const joker = new Multi.ObjectJoker(randomizer, {
        of: {
          a: 1,
          b: 3,
          c: testJoker,
          foo: {
            bar: testJoker
          }
        }
      });

      expect(joker.value).to.deep.equal({
        a: 1,
        b: 3,
        c: 7,
        foo: {
          bar: 7
        }
      });

    });

    it('Empty Selection', () => {

      const joker = new Multi.ObjectJoker(randomizer);

      expect(() => joker.value).to.throw();

    });

  });

  describe('Typed', () => {

    describe('Regular', () => {

      it('Templated', () => {

        class TestType {
          constructor(v, z) {
            Object.assign(this, { v, z });
          }
        }

        const testJoker = new Joker(randomizer);
        testJoker.getValue = () => 7;

        const joker = new Multi.TypedJoker(randomizer, {
          of: TestType,
          params: [testJoker, 3]
        });

        expect(joker.value).to.be.instanceOf(TestType);
        expect(joker.value).to.deep.equal({ v: 7, z: 3 })

      });

      it('Templated without params', () => {

        class TestType {
          constructor(v, z) {
            Object.assign(this, { v, z });
          }
        }

        const joker = new Multi.TypedJoker(randomizer, {
          of: TestType,
        });

        expect(joker.value).to.be.instanceOf(TestType);
      });

      it('Empty Selection', () => {

        const joker = new Multi.TypedJoker(randomizer);

        expect(() => joker.value).to.throw();

      });

    });

    describe('Inited', () => {

      it('Init Only', () => {

        const joker = new Multi.TypedJoker(randomizer, {
          init: () => new Date(0)
        });

        expect(joker.value).to.be.instanceOf(Date);
        expect(joker.value).to.deep.equal(new Date(0));

      });

      it('Init Only With Params', () => {

        const testJoker = new Joker(randomizer);
        testJoker.getValue = () => 7;

        const joker = new Multi.TypedJoker(randomizer, {
          init: epoch => new Date(epoch),
          initWith: [testJoker]
        });

        expect(joker.value).to.be.instanceOf(Date);
        expect(joker.value).to.deep.equal(new Date(7));

      });

      it('Init Only Params and type', () => {

        const testJoker = new Joker(randomizer);
        testJoker.getValue = () => 7;

        const joker = new Multi.TypedJoker(randomizer, {
          of: Date,
          params: [2],
          init: (date, value, value2) => date.setMilliseconds(value + value2),
          initWith: [testJoker, 1]
        });

        expect(joker.value).to.be.instanceOf(Date);
        expect(joker.value).to.deep.equal(new Date(8));

      });

    });

  })

});