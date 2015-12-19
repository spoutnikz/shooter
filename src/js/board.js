'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Board = (function () {
  function Board(engine, event) {
    _classCallCheck(this, Board);

    this.engine = engine;
    this.event = event;

    this.type = 'board';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    // this.alpha = 5;
    this.alpha = 255;
  }

  _createClass(Board, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {
      this.engine.background(25, 25, 25, 255);
    }
  }]);

  return Board;
})();

module.exports = Board;