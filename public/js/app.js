(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var Application = require('application');

(function () {
  console.log('Init Application');
  var application = new Application();
})();
},{"application":2}],2:[function(require,module,exports){
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
},{"gameController":3}],3:[function(require,module,exports){
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
},{"gameModel":5,"gameView":7}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BugModel = function BugModel() {
  _classCallCheck(this, BugModel);

  console.log('BugModel constructor');
};

module.exports = BugModel;
},{}],5:[function(require,module,exports){
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
},{"bugModel":4,"playerModel":6}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}]},{},[1])