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

var Board = require('board');
var Fps = require('fps');
var Player = require('player');
var Bug = require('bug');
var Utils = require('utils');
var Event = require('event');

var Application = (function () {
  function Application($container) {
    _classCallCheck(this, Application);

    console.log('Application constructor');

    this.entities = new Map();
    this.entities.set('collidable', new Map());
    this.entities.set('stage', new Map());

    this.event = new Event();
    this.event.addListener('kill', this.kill.bind(this));

    this.init();
  }

  _createClass(Application, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.engine = new p5(function (p) {
        p.setup = _this.setup.bind(_this);
        p.draw = _this.draw.bind(_this);
      }, 'container');
    }
  }, {
    key: 'setup',
    value: function setup() {
      console.log('engine setup');
      window.p = this.engine;

      // collision detection
      this.quad = new QuadTree({ x: 0, y: 0, width: 640, height: 360 }, false, 7);

      // create all entities and put them in maps
      var board = new Board(this.engine, this.event);
      var fps = new Fps(this.engine, this.event);
      var player = new Player(this.engine, this.event);

      this.entities.get('stage').set(board.uid, board);
      this.entities.get('stage').set(fps.uid, fps);
      this.entities.get('collidable').set(player.uid, player);

      for (var i = 0; i < 50; i++) {
        var bug = new Bug(this.engine, this.event);
        this.entities.get('collidable').set(bug.uid, bug);
      };

      // init canvas
      this.engine.createCanvas(640, 360);
      this.engine.background(25, 25, 0);
    }
  }, {
    key: 'draw',

    // main loop
    value: function draw() {
      var _this2 = this;

      // reset quad tree
      this.quad.clear();
      this.quad.insert(this.entities.get('collidable'));

      // collision detection
      this.entities.get('collidable').forEach(function (entity, i) {
        var items = _this2.quad.retrieve(entity);
        items.forEach(function (item) {
          if (item.isColliding && entity.isColliding || entity.type === item.type) {
            return;
          }
          if (Utils.intersects(entity.x, entity.y, entity.radius, item.x, item.y, item.radius)) {
            entity.isColliding = true;
            entity.collidingWith = item;
          }
        });
      });

      // entities updates & renders
      this.entities.get('stage').forEach(function (entity) {
        entity.update();
        entity.render(); // put in a separate loop?
      });

      this.entities.get('collidable').forEach(function (entity) {
        entity.update();
        entity.render(); // put in a separate loop?
      });
    }
  }, {
    key: 'kill',
    value: function kill(me) {

      this.entities.get('collidable')['delete'](me.uid);
    }
  }]);

  return Application;
})();

module.exports = Application;
},{"board":3,"bug":4,"event":5,"fps":7,"player":8,"utils":6}],3:[function(require,module,exports){
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
},{"utils":6}],4:[function(require,module,exports){
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
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = Utils.rand(600, 640);
    this.y = Utils.rand(50, 300);
    this.width = this.height = this.radius = 10;

    this.index = null;
    this.level = 1;
    this.color = [Utils.rand(50, 255), Utils.rand(50, 255), Utils.rand(50, 255), 255];
    this.velocity = Utils.rand(10, 100) / 100;
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
},{"utils":6}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Event = (function () {
    // 'Subject', Observer pattern

    function Event() {
        _classCallCheck(this, Event);

        console.log('Event constructor');
        this.listeners = new Map(); // use WeakMaps instead to avoid possible leaks?
    }

    _createClass(Event, [{
        key: 'addListener',
        value: function addListener(label, callback) {
            this.listeners.has(label) || this.listeners.set(label, []);
            this.listeners.get(label).push(callback);
        }
    }, {
        key: 'removeListener',
        value: function removeListener(label, callback) {
            var listeners = this.listeners.get(label),
                index = undefined;

            if (listeners && listeners.length) {
                index = listeners.reduce(function (i, listener, index) {
                    return typeof listener === 'function' && listener === callback ? i = index : i;
                }, -1);

                if (index > -1) {
                    listeners.splice(index, 1);
                    this.listeners.set(label, listeners);
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }
            return false;
        }
    }]);

    return Event;
})();

module.exports = Event;
},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'rand',
    value: function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: 'intersects',
    value: function intersects(x1, y1, r1, x2, y2, r2) {
      // does two circles intersects?
      var distanceSq = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
      return Math.pow(r2 - r1, 2) <= distanceSq && distanceSq <= Math.pow(r1 + r2, 2);
    }
  }, {
    key: 'uid',
    value: function uid() {

      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-21963136
      // lookuptable
      var lut = [];for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
      }

      var d0 = Math.random() * 4294967295 | 0;
      var d1 = Math.random() * 4294967295 | 0;
      var d2 = Math.random() * 4294967295 | 0;
      var d3 = Math.random() * 4294967295 | 0;

      return lut[d0 & 255] + lut[d0 >> 8 & 255] + lut[d0 >> 16 & 255] + lut[d0 >> 24 & 255] + '-' + lut[d1 & 255] + lut[d1 >> 8 & 255] + '-' + lut[d1 >> 16 & 15 | 64] + lut[d1 >> 24 & 255] + '-' + lut[d2 & 63 | 128] + lut[d2 >> 8 & 255] + '-' + lut[d2 >> 16 & 255] + lut[d2 >> 24 & 255] + lut[d3 & 255] + lut[d3 >> 8 & 255] + lut[d3 >> 16 & 255] + lut[d3 >> 24 & 255];
    }
  }]);

  return Utils;
})();

module.exports = Utils;
},{}],7:[function(require,module,exports){
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
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

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
},{"utils":6}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Player = (function () {
  function Player(engine, event) {
    _classCallCheck(this, Player);

    this.engine = engine;
    this.event = event;

    this.type = 'player';
    this.uid = Utils.uid();
    console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 20;

    this.level = 1;
    this.color = [255, 204, 0, 255];
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {
      this.x = this.engine.mouseX;
      this.y = this.engine.mouseY;
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

  return Player;
})();

module.exports = Player;
},{"utils":6}]},{},[1])