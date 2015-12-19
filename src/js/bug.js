'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Bug = (function () {
  function Bug(engine, event) {
    _classCallCheck(this, Bug);

    this.engine = engine;
    this.event = event;

    this.type = 'bug';
    this.group = 'collidable';
    this.side = 'empire'; // empire|rebels, for ff mgmt
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = Utils.rand(600, 640);
    this.y = Utils.rand(50, 300);
    this.width = this.height = this.radius = 10;

    this.index = null;
    this.level = 1;
    this.color = [Utils.rand(50, 255), Utils.rand(50, 255), Utils.rand(50, 255), 255];
    this.velocity = Utils.rand(20, 200) / 100;
  }

  _createClass(Bug, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {

      this.x = this.x - this.velocity; // drift to left

      if (this.x < 0 || this.isColliding) {
        this.event.emit('kill', this);
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
  }]);

  return Bug;
})();

module.exports = Bug;