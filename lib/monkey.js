import './art';
import Chance from 'chance';
import JokerFactory from './jokers/jocker.factory';

export const randomiser = new Chance(process.env.LIB_MONKEY_SEED);
export const Jockers = new JokerFactory(randomiser);