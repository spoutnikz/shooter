'use strict';

var Utils = require('utils');

class Fps {

  constructor (engine, event) {
    this.engine = engine;
    this.event = event;

    this.type = 'fps';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    this.frameRate = 0;
    this.lastFrameCount = 0;
  }

  init () {}

  update () {
    if (this.lastFrameCount + 30 < this.engine.frameCount) {
      this.lastFrameCount = this.engine.frameCount;
      this.frameRate = this.engine.frameRate();

    }
  }

  render () {
    this.engine.fill(0, 128, 128);
    this.engine.rect(0, 0, 50, 20);
    this.engine.fill(255, 255, 255);
    this.engine.text(Math.round(this.frameRate) + ' fps', 0, 0, 200, 80);
  }
}

module.exports = Fps;