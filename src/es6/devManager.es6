'use strict';

class devManager {
  constructor () {
    console.log('devManager constructor');
    this.test();
  }

  test () {
    console.log('in test');
  }
}

module.exports = {
  devManager: devManager,
};