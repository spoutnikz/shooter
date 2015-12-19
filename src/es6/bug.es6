'use strict';

var Utils = require('utils');

class Bug {

  constructor (engine, event) {
    this.engine = engine;
    this.event = event;

    this.type = 'bug';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = Utils.rand(600, 640);
    this.y = Utils.rand(50, 300);
    this.width = this.height = this.radius = 10;

    this.index = null;
    this.level = 1;
    this.color = [Utils.rand(50, 255), Utils.rand(50, 255), Utils.rand(50, 255), 255];
    this.velocity = Utils.rand(10, 100) / 100;
  }

  init () {}

  update () {
    this.x = this.x - this.velocity; // drift to left

    if (this.x < 0 || this.isColliding) {
      this.event.emit('kill', this);
    }
  }

  render () {

    let alpha = this.isColliding ? 50 : 255;

    this.engine.noStroke();
    this.engine.fill(this.color[0], this.color[1], this.color[2], alpha);

    this.engine.ellipseMode(this.engine.RADIUS);
    this.engine.ellipse(this.x, this.y, this.width, this.height);

  }
}

module.exports = Bug;