'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BugModel = require('bugModel');
var PlayerModel = require('playerModel');

var GameModel = (function () {
  function GameModel() {
    _classCallCheck(this, GameModel);

    console.log('GameModel constructor');

    this._playerModel = new PlayerModel();
    this._bugModels = [];

    for (var i = 0; i < 4; i++) {
      this.bugModels.push(new BugModel());
    }

    console.log('gameModel: playerModel, bugModels:', this._playerModel, this.bugModels);
  }

  _createClass(GameModel, [{
    key: 'playerModel',
    get: function () {
      return this._playerModel;
    }
  }, {
    key: 'bugModels',
    get: function () {
      return this._bugModels;
    }
  }]);

  return GameModel;
})();

module.exports = GameModel;