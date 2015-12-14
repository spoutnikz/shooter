'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameController = require('gameController');

var Application = (function () {
  function Application($container) {
    var _this = this;

    _classCallCheck(this, Application);

    console.log('Application constructor, new gameController: ', this.gameController, p5);
    this.x = 0;
    this.y = 0;
    this.up = true;

    this.engine = new p5(function (p) {
      p.setup = _this.setup.bind(_this);
      p.draw = _this.draw.bind(_this);
    });
  }

  _createClass(Application, [{
    key: 'setup',
    value: function setup() {
      console.log('engine setup');
      this.gameController = new GameController(this.engine);
    }
  }, {
    key: 'draw',

    // game main loop
    value: function draw() {
      // console.log('engine draw loop');
      this.gameController.update();
      this.gameController.render();
    }
  }]);

  return Application;
})();

module.exports = Application;