# lib-monkey

[![Travis](https://img.shields.io/travis/lib-monkey/lib-monkey/master.svg)](https://travis-ci.org/lib-monkey/lib-monkey) [![Coveralls github](https://img.shields.io/coveralls/github/lib-monkey/lib-monkey.svg)](https://coveralls.io/github/lib-monkey/lib-monkey) [![David](https://img.shields.io/david/lib-monkey/lib-monkey.svg)](https://david-dm.org/lib-monkey/lib-monkey) [![Dependency Status](https://dependencyci.com/github/lib-monkey/lib-monkey/badge)](https://dependencyci.com/github/lib-monkey/lib-monkey) [![npm](https://img.shields.io/npm/v/lib-monkey.svg)](https://www.npmjs.com/package/lib-monkey) [![API Doc](https://doclets.io/lib-monkey/lib-monkey/master.svg)](https://doclets.io/lib-monkey/lib-monkey/master/overview)

Monkey Testing for libraries

When there is a need to test code with random values


## Installation
```bash
  npm install lib-monkey
```

### cli
```bash
  npm install -g lib-monkey


  lib-monkey -s [seed] [CMD]

  lib-monkey -j [joker description]

  
  # example

  lib-monkey -s 16012018 -j int.min(0).max(10) ===> 7
```



## Getting Started

There are multiple jokers and runners to use for the library but the basic idea is to send the joker to one of the runners to know where to put the random value


```javascript

const monkey = require('lib-monkey');

monkey
  .fnr
  .params(monkey.int.min(0).max(10))
  .register(a => {
      
      // Do some tests with a as ranom value
      // Will accept sync or prommise based results

  })
  .exec(n_times, concurrency)
  .then(() => { // Passed })
  .catch(err => { //There is an error })

monkey
  .fnr
  .params(monkey.int.min(0).max(10))
  .register((a, done) => {
      
      // Do some tests with a as ranom value

      // Call done after async tests

  })
  .exec(n_times, concurrency)
  .then(() => { // Passed })
  .catch(err => { //There is an error })

```

## ```Jokers```

There are multipe jokers in library and they have multiple modifyers.

There is the base modifyer ```nullable(boolean|chance|null == true)``` and all the other modifyers are based of of [Chance][chance] library

#### Example

```javascript

monkey.int.min(0).max(10) => chance.integer({ min:0, max: 10 })

monkey.bool.likelihood(70) => chance.bool({ likelihood: 70 })

```

Currently there are the following jokers:

 - bool, char, float, int, letter, natural, string
 - date, hammertime, timestamp, timezone
 - paragraph, sentence, syllable, word
 - pick (from array), array (of jokers), map, object (deep map), typed (of specific type)


## ```Runners```

Currently there are two runners avialbe, ```FunctionRunner - fnr``` and ```PipedRunner - pnr```

FunctionRunner is designed to run a single function multipe times while the PipedRunner is designed to run several function and piping the result from one to the other

#### Example

```javascript

  monkey
    .pnr
    .params(monkey.natural.max(10))
    .register(num => num + 1)
    .register(num => num + 1)
    .register(num => num + 1)
    .params(monkey.syllable)
    .register((num, randomSylibalValue) => console.log('Will be the original num + 3', num, randomSylibalValue))
    .exec(3)

```

## Roadmap
This project should co-exist with all the avialbe test runners like mocha or jasmin and be used as a tool for random value testing

- [x] Add more Jokers and Runners
- [ ] Add self assertion api
- [ ] Finish the docs
- [ ] Create code coverage for the library
- [x] Maybe change the api to be dot chainable


## License

[MIT][license] © [Lib Monkey Team][author]

[chance]: https://www.npmjs.com/package/chance

[license]: LICENSE

[author]: https://github.com/lib-monkey
