'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');
var Bullet = require('bullet');

var Player = (function () {
  function Player(engine, event) {
    _classCallCheck(this, Player);

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

  _createClass(Player, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {
      this.x = this.engine.mouseX;
      this.y = this.engine.mouseY;

      if (this.engine.mouseIsPressed) {
        this.fireThrottle();
      }
    }
  }, {
    key: 'render',
    value: function render() {

      var alpha = this.isColliding ? 50 : 255;

      this.engine.noStroke();
      this.engine.fill(this.color[0], this.color[1], this.color[2], alpha);

      this.engine.ellipseMode(this.engine.RADIUS);
      this.engine.ellipse(this.x, this.y, this.width, this.height);
    }
  }, {
    key: 'fire',
    value: function fire() {

      var bullet = new Bullet(this.engine, this.event);
      bullet.x = this.x + 25;
      bullet.y = this.y;
      this.event.emit('register', bullet);
    }
  }]);

  return Player;
})();

module.exports = Player;