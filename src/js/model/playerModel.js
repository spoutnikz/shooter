'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PlayerModel = (function () {
  function PlayerModel() {
    _classCallCheck(this, PlayerModel);

    this._position = [0, 0];
    this._level = 1;
    this._dimensions = [50, 50];
    this._color = [255, 204, 0];
    console.log('PlayerModel constructor');
  }

  _createClass(PlayerModel, [{
    key: 'position',
    get: function () {
      return this._position;
    },
    set: function (position) {
      this._position = position;
    }
  }, {
    key: 'level',
    get: function () {
      return this._level;
    },
    set: function (level) {
      if (level > 0 && level <= 5) this._level = level;
    }
  }, {
    key: 'dimensions',
    get: function () {
      return this._dimensions;
    },
    set: function (dimensions) {
      this._dimensions = dimensions;
    }
  }, {
    key: 'color',
    get: function () {
      return this._color;
    },
    set: function (color) {
      this._color = color;
    }
  }]);

  return PlayerModel;
})();

module.exports = PlayerModel;