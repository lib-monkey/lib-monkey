import './art';
import Chance from 'chance';
import _JokerFactoryCreator from './creators/joker.factory.creator';
import _RunnerFacotryCreator from './creators/runner.factory.creator';

export const randomiser = new Chance(process.env.LIB_MONKEY_SEED);

export const JokerCreator = new _JokerFactoryCreator(randomiser);

export const RunnerCreator = new _RunnerFacotryCreator(randomiser);