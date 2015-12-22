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

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 7.5;

    this.index = null;
    this.level = 1;
    this.velocity = 5;
    this.assets = null;
    this.angle = 0;

    this.bulletType = 'floppy';

    this.event.emit('getAssets', this); // call for global assets
    this.img = this.assets.get('images').get(this.bulletType);
  }

  _createClass(Bullet, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {

      this.x = this.x + this.velocity; // drift to right
      this.angle += 10;

      if (this.x > 640 || this.isColliding) {
        this.event.emit('kill', this);
      }

      this.angle += 4;
      if (this.angle % 360 === 0) this.angle = 0;
    }
  }, {
    key: 'render',
    value: function render() {

      this.engine.push();
      this.engine.translate(this.x, this.y);
      this.engine.angleMode(this.engine.DEGREES);
      this.engine.rotate(this.angle);
      this.engine.imageMode(this.engine.CENTER);
      this.engine.image(this.img, 0, 0);
      this.engine.pop();
    }
  }]);

  return Bullet;
})();

module.exports = Bullet;