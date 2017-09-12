# lib-monkey
Monkey Testing for libraries

When there is a need to test code with random values


## Installation

  npm install lib-monkey

### cli
  npm install -g lib-monkey

## Getting Started

There are multiple jokers and runners to use for the library but the basic idea is to send the joker to one of the runners to know where to put the random value


```javascript

const { Jokers, Runners } = require('lib-monkey');

let fn_runner = Runners.FunctionRunner();


fn_runner.register(a => {
    
    // Do some tests with a as ranom value
    // Will accept sync or prommise based results

}, Jokers.IntegerJoker.min(0).max(10));


fn_runner.register((a, done) => {
    
    // Do some tests with a as ranom value

    // Call done after async tests

}, Jokers.IntegerJoker.min(0).max(10));


fn_runner.exec(n_times, concurrency)
  .then(() => { // Passed })
  .catch(err => { //There is an error })


```
## Roadmap
This project should co-exist with all the avialbe test runners like mocha or jasmin and be used as a tool for random value testing

- [ ] Add more Jokers and Runners
- [ ] Add self assertion api
- [ ] Create code coverage for the library
- [ ] Maybe change the api to be dot chainable


## License

[MIT][license] © [Lib Monkey Team][author]


[license]: LICENSE

[author]: https://github.com/lib-monkey