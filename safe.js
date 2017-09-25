
require('./dist/console.bindings');

let monkey = require('./dist/monkey');

let lm = module.exports = { };

monkey.JokerCreator.create(lm);
monkey.RunnerCreator.create(lm);