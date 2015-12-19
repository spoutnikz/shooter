'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Fps = (function () {
  function Fps(engine, event) {
    _classCallCheck(this, Fps);

    this.engine = engine;
    this.event = event;

    this.type = 'fps';
    this.group = 'stage';
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

    this.frameRate = 0;
    this.lastFrameCount = 0;
  }

  _createClass(Fps, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {
      if (this.lastFrameCount + 30 < this.engine.frameCount) {
        this.lastFrameCount = this.engine.frameCount;
        this.frameRate = this.engine.frameRate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.engine.fill(0, 128, 128);
      this.engine.rect(0, 0, 50, 20);
      this.engine.fill(255, 255, 255);
      this.engine.text(Math.round(this.frameRate) + ' fps', 0, 0, 200, 80);
    }
  }]);

  return Fps;
})();

module.exports = Fps;