'use strict';

var Utils = require('utils');

class Player {

  constructor (engine, event) {
    this.engine = engine;
    this.event = event;

    this.type = 'player';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 20;

    this.level = 1;
    this.color = [255, 204, 0, 255];
  }

  init () {}

  update () {
    this.x = this.engine.mouseX
    this.y = this.engine.mouseY;
  }

  render () {

    let alpha = this.isColliding ? 50 : 255;

    this.engine.noStroke();
    this.engine.fill(this.color[0], this.color[1], this.color[2], alpha);

    this.engine.ellipseMode(this.engine.RADIUS);
    this.engine.ellipse(this.x, this.y, this.width, this.height);

  }
}

module.exports = Player;