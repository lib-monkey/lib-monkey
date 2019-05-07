import './art';
import Chance from 'chance';
import _JokerFactoryCreator from './creators/joker.factory.creator';
import _ApiFacotryCreator from './creators/api.factory.creator';

export const randomiser = new Chance(process.env.LIB_MONKEY_SEED);

export const JokerCreator = new _JokerFactoryCreator(randomiser);

export const ApiCreator = new _ApiFacotryCreator(randomiser);