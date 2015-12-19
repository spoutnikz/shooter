'use strict';

var Utils = require('utils');

class Bullet {


  constructor (engine, event) {

    this.engine = engine;
    this.event = event;

    this.type = 'bullet';
    this.group = 'collidable';
    this.side = 'rebels'; // empire|rebels, for ff mgmt
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 3;

    this.index = null;
    this.level = 1;
    this.color = [255, 255, 255, 255];
    this.velocity = 5;

  }


  init () {}


  update () {

    this.x = this.x + this.velocity; // drift to right

    if (this.x < 0 || this.isColliding) {
      this.event.emit('kill', this);
    }

  }


  render () {

    this.engine.noStroke();
    this.engine.fill(this.color[0], this.color[1], this.color[2], this.color[3]);

    this.engine.ellipseMode(this.engine.RADIUS);
    this.engine.ellipse(this.x, this.y, this.width, this.height);

  }
}

module.exports = Bullet;