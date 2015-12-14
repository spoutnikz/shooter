'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameModel = require('gameModel');
var GameView = require('gameView');

var GameController = (function () {
  function GameController(engine) {
    _classCallCheck(this, GameController);

    this.engine = engine;
    this.gameModel = new GameModel();
    this.gameView = new GameView(this.gameModel, this.engine);
    console.log('GameController constructor');
  }

  _createClass(GameController, [{
    key: 'update',
    value: function update() {
      var playerModel = this.gameModel.playerModel;
      playerModel.position = [this.engine.mouseX, this.engine.mouseY];
    }
  }, {
    key: 'render',
    value: function render() {
      this.gameView.render();
    }
  }]);

  return GameController;
})();

module.exports = GameController;