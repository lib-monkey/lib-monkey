
import sinon from 'sinon';
import { expect, assert } from 'chai';
import Chance from 'chance';

import * as BasicJokers from '../lib/jokers/basic';
import * as TextJokers from '../lib/jokers/text';
import * as DateJokers from '../lib/jokers/date';

const AllJokers = Object.assign({}, BasicJokers, TextJokers, DateJokers);

const Randomizer = new Chance();

describe('Simple Jokers', () => {

  it('Basic Initialisation', () => {

    Object.keys(AllJokers)
      .map(className => AllJokers[className])
      .forEach(Joker => expect(() => new Joker(Randomizer)).to.not.throw());

  });

  it('No duplicate joker names', () => {
    
    let testedNames = {};

    for(let className in AllJokers){
      let Joker = AllJokers[className];

      if(Joker.name in testedNames){
        assert(false, `Joker ${className} has the same name as ${testedNames[Joker.name]}`);
      } else {
        testedNames[Joker.name] = className;
      }
    }

  });

  it('Getting value doesn\'t throw', () => {

    Object.keys(AllJokers)
      .map(className => new AllJokers[className](Randomizer))
      .forEach(joker => expect(() => joker.value).to.not.throw());

  });
  
});