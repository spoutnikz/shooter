'use strict';

var Utils = require('utils');

class Board {

  constructor (engine, event) {
    this.engine = engine;
    this.event = event;

    this.type = 'board';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    // this.alpha = 5;
    this.alpha = 255;
  }

  init () {}

  update () {}

  render () {
    this.engine.background(25, 25, 25, 255);
  }
}

module.exports = Board;