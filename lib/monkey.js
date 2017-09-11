import './art';
import Chance from 'chance';
import _JokerFactory from './jokers/joker.factory';
import _RunnerFacotry from './runner/runner.factory';

export const randomiser = new Chance(process.env.LIB_MONKEY_SEED);

export const Jokers = new _JokerFactory(randomiser);

export const Runners = new _RunnerFacotry(randomiser);