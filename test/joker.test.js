
import sinon from 'sinon';
import { expect, assert } from 'chai';

import Joker from '../lib/common/joker';

describe('Joker', () => {

  it('Initialisation', () => {
    let rundomiser = { };
    expect(() => new Joker(rundomiser)).to.not.throw();
    expect(() => new Joker(rundomiser, {})).to.not.throw();
  });

  it('Modifiers', () => {

    class TestJoker extends Joker {
      get modifiers(){
        return ['a', 'b', 'c', 'd'];
      }
    }

    let joker = new TestJoker();

    expect(joker).to.have.property('a');
    expect(joker).to.have.property('b');
    expect(joker).to.have.property('c');
    expect(joker).to.have.property('d');

  });

  it('Options', () => {

    class TestJoker extends Joker {
      get modifiers(){
        return ['foo'];
      }
    }

    let joker = new TestJoker();

    joker.foo('bar');

    expect(joker.options).to.have.property('foo', 'bar');

  });

  it('Nullable', () => {

    let randomiser = {
      bool: sinon.stub().returns(true)
    };

    let joker = new Joker(randomiser);

    expect(joker.nullable().value).to.equal(null);
    assert(randomiser.bool.calledWith({ likelihood: 50 }), 'Call with null isn\'t set to 50');

    expect(joker.nullable(true).value).to.equal(null);
    assert(randomiser.bool.calledWith({ likelihood: 50 }));

    expect(joker.nullable(false).value).to.equal(null);
    assert(randomiser.bool.calledWith({ likelihood: 0 }));

    expect(joker.nullable(30).value).to.equal(null);
    assert(randomiser.bool.calledWith({ likelihood: 30 }));

  });

});