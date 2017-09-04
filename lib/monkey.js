import './art';
import Chance from 'chance';
import _JokerFactory from './jokers/jocker.factory';
import _FunctionRunner from './runner/function.runner';

export const randomiser = new Chance(process.env.LIB_MONKEY_SEED);

export const Jockers = new _JokerFactory(randomiser);

export const FunctionRunner = new _FunctionRunner(randomiser);