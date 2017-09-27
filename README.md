# lib-monkey
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
  .eval((a, done) => {
      
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
 - pick (from array), array (of jokers)


## Roadmap
This project should co-exist with all the avialbe test runners like mocha or jasmin and be used as a tool for random value testing

- [ ] Add more Jokers and Runners
- [ ] Add self assertion api
- [ ] Create code coverage for the library
- [ ] Maybe change the api to be dot chainable


## License

[MIT][license] © [Lib Monkey Team][author]

[chance]: https://www.npmjs.com/package/chance

[license]: LICENSE

[author]: https://github.com/lib-monkey