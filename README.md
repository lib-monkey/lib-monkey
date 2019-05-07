# lib-monkey

[![Travis](https://img.shields.io/travis/lib-monkey/lib-monkey.svg)](https://travis-ci.org/lib-monkey/lib-monkey) [![Coveralls github](https://img.shields.io/coveralls/github/lib-monkey/lib-monkey.svg)](https://coveralls.io/github/lib-monkey/lib-monkey) [![David](https://img.shields.io/david/lib-monkey/lib-monkey.svg)](https://david-dm.
/lib-monkey/lib-monkey) [![Dependency Status](https://dependencyci.com/github/lib-monkey/lib-monkey/badge)](https://dependencyci.com/github/lib-monkey/lib-monkey) [![npm](https://img.shields.io/npm/v/lib-monkey.svg)](https://www.npmjs.com/package/lib-monkey) [![API Doc](https://doclets.io/lib-monkey/lib-monkey/master.svg)](https://doclets.io/lib-monkey/lib-monkey/master/overview)

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

describe('test', () => {

  it('test sync or prommise', () => 
     monkey.it(() => {

      const a = monkey.generate(monkey.int.min(0).max(10));
      
      // Do some tests with a as ranom value
      // Will accept sync or prommise based results

    })
     .do(n_times, concurrency));

  it('test callback async', () => 
     monkey.it((done) => {
      const a = monkey.generate(monkey.int.min(0).max(10));
      
      // Do some tests with a as ranom value
      // Call done after async tests

    })
     .do(n_times, concurrency));
});
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


## ```monkey.it```

It's basicaly every it function in every test framework, except that it's nameless and supports contexts <br/>
> ```monkey.it(fn, context)``` where fn will have it's ```this``` equal context.

And this it will forward and enritch any assertion error that 

#### Example

```javascript

  monkey.it(async () => {
    const foo = monkey.generate(monkey.bool); // foo will be 50/50 true false pretty much

    // Do Some tests and 
  })
    .do(5)
    .catch(err => console.error(err) || process.exit(-1));

```

## Roadmap
This project should co-exist with all the avialbe test runners like mocha or jasmin and be used as a tool for random value testing

- [x] Add more Jokers and Runners
- [ ] ~~Add self assertion api~~
- [ ] Finish the docs
- [x] Create code coverage for the library
- [x] Maybe change the api to be dot chainable


## License

[MIT][license] © [Lib Monkey Team][author]

[chance]: https://www.npmjs.com/package/chance

[license]: LICENSE

[author]: https://github.com/lib-monkey
