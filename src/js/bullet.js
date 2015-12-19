'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Bullet = (function () {
  function Bullet(engine, event) {
    _classCallCheck(this, Bullet);

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

  _createClass(Bullet, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {

      this.x = this.x + this.velocity; // drift to right

      if (this.x < 0 || this.isColliding) {
        this.event.emit('kill', this);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      this.engine.noStroke();
      this.engine.fill(this.color[0], this.color[1], this.color[2], this.color[3]);

      this.engine.ellipseMode(this.engine.RADIUS);
      this.engine.ellipse(this.x, this.y, this.width, this.height);
    }
  }]);

  return Bullet;
})();

module.exports = Bullet;