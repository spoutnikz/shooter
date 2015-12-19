'use strict';

var Utils = require('utils');
var Bullet = require('bullet');

class Player {

  constructor (engine, event) {
    this.engine = engine;
    this.event = event;

    this.type = 'player';
    this.group = 'collidable';
    this.side = 'rebels'; // empire|rebels, for ff mgmt
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 20;

    this.level = 1;
    this.color = [255, 204, 0, 255];

    this.fireRate = 200 / this.level; // ms

    this.fireThrottle = Utils.throttle(this.fire, this.fireRate, this);
  }

  init () {}

  update () {
    this.x = this.engine.mouseX;
    this.y = this.engine.mouseY;

    if (this.engine.mouseIsPressed) {
      this.fireThrottle();
    }

  }

  render () {

    let alpha = this.isColliding ? 50 : 255;

    this.engine.noStroke();
    this.engine.fill(this.color[0], this.color[1], this.color[2], alpha);

    this.engine.ellipseMode(this.engine.RADIUS);
    this.engine.ellipse(this.x, this.y, this.width, this.height);

  }


  fire () {

    let bullet = new Bullet(this.engine, this.event);
    bullet.x = this.x + 25;
    bullet.y = this.y;
    this.event.emit('register', bullet);

  }

}

module.exports = Player;