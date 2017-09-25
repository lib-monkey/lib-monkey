
require('./dist/console.bindings');

let monkey = require('./dist/monkey');

let lm = { };

monkey.JokerCreator.create(lm);
monkey.RunnerCreator.create(lm);

module.exports = lm;