'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameView = (function () {
  function GameView(gameModel, engine) {
    _classCallCheck(this, GameView);

    this.gameModel = gameModel;
    this.engine = engine;
    console.log('GameView constructor, model, engine: ', this.gameModel, this.engine);

    this.init();
  }

  _createClass(GameView, [{
    key: 'init',
    value: function init() {
      this.engine.createCanvas(700, 700);
      this.engine.background(25, 25, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('gameView render');

      var playerModel = this.gameModel.playerModel;
      var position = playerModel.position;
      var dimensions = playerModel.dimensions;
      var color = playerModel.color;

      this.engine.rectMode(this.engine.RADIUS);
      this.engine.noStroke();
      this.engine.fill(color[0], color[1], color[2]);
      this.engine.rect(position[0], position[1], dimensions[0], dimensions[1]);

      this.engine.background(25, 25, 25, 5);

      this.engine.fill(0, 128, 128);
      this.engine.rect(0, 0, 200, 80);
      this.engine.fill(255, 255, 255);
      this.engine.text(Math.round(this.engine.frameRate()), 0, 0, 200, 80);
    }
  }]);

  return GameView;
})();

module.exports = GameView;