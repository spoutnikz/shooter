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

    // define all entity maps
    this.entities = new Map();
    this.entities.set('collidable', new Map());
    this.entities.set('stage', new Map());

    // define all asset maps
    this.assets = new Map();

    // init event manager
    this.event = new Event();
    this.event.addListener('kill', this.kill.bind(this)); // kill entity
    this.event.addListener('register', this.register.bind(this)); // register entity to map
    this.event.addListener('getAssets', this.getAssets.bind(this)); // get assets for entity

    // init time
    this.initMs = null; // milliseconds, start of the game time
    this.initAmountBugs = 4;
    this.bugCount = 0;

    this.init();
  }

  _createClass(Application, [{
    key: 'init',

    /**
     * Init engine
     */
    value: function init() {
      var _this = this;

      // p5 instance mode initializes this way
      this.engine = new p5(function (p) {
        p.preload = _this.preload.bind(_this);
        p.setup = _this.setup.bind(_this);
        p.draw = _this.draw.bind(_this);
      }, 'container');
    }
  }, {
    key: 'preload',

    /**
     * Preload assets
     */
    value: function preload() {

      // set bullet sprites
      var bulletImgs = new Map([['floppy', this.engine.loadImage('images/floppy.png')]]);
      this.assets.set('bullet', new Map([['images', bulletImgs]]));
    }
  }, {
    key: 'setup',

    /**
     * Engine setup
     */
    value: function setup() {

      console.log('engine setup');
      window.p = this.engine;

      this.initMs = window.performance.now();

      // collision detection
      this.quad = new QuadTree({ x: 0, y: 0, width: 640, height: 360 }, false, 7);

      // create all entities and put them in maps
      var board = new Board(this.engine, this.event);
      var fps = new Fps(this.engine, this.event);
      var player = new Player(this.engine, this.event);
      this.entities.get('stage').set(board.uid, board);
      this.entities.get('stage').set(fps.uid, fps);
      this.entities.get('collidable').set(player.uid, player);

      for (var i = 0; i < this.initAmountBugs; i++) {
        this.bugCount++;
        var bug = new Bug(this.engine, this.event);
        this.entities.get('collidable').set(bug.uid, bug);
      };

      // init canvas
      this.engine.createCanvas(640, 360);
      this.engine.background(25, 25, 0);
    }
  }, {
    key: 'draw',

    /**
     * Engine loop
     */
    value: function draw() {

      this.addBugs();

      // reset quad tree
      this.quad.clear();
      this.quad.insert(this.entities.get('collidable'));

      // collision detection
      this.collisions();

      // stage entities updates & renders
      this.entities.get('stage').forEach(function (entity) {
        entity.update();
        entity.render(); // put in a separate loop?
      });

      // collidable entities updates & renders
      this.entities.get('collidable').forEach(function (entity) {
        entity.update();
        entity.render(); // put in a separate loop?
      });
    }
  }, {
    key: 'kill',

    /**
     * Process kill request
     */
    value: function kill(me) {

      if (me.type === 'bug') this.bugCount--;
      this.entities.get(me.group)['delete'](me.uid);
    }
  }, {
    key: 'addBugs',

    /**
     * Add more and more bugs over time
     */
    value: function addBugs() {

      var diff = (window.performance.now() - this.initMs) / 10000;
      // x^2 * 0.2 + 4
      var amount = Math.round(diff * diff * 0.2 + this.initAmountBugs);

      // not great, player is included in the count
      if (this.bugCount < amount) {
        var bug = new Bug(this.engine, this.event);
        this.entities.get('collidable').set(bug.uid, bug);
        this.bugCount++;
      }
    }
  }, {
    key: 'collisions',

    /**
     * Test all collidables against each other
     */
    value: function collisions() {
      var _this2 = this;

      this.entities.get('collidable').forEach(function (entity, i) {
        var items = _this2.quad.retrieve(entity); // quad tree magic

        items.forEach(function (item) {
          if (item.isColliding && entity.isColliding || entity.side === item.side) {
            return;
          }
          if (Utils.intersects(entity.x, entity.y, entity.radius, item.x, item.y, item.radius)) {
            entity.isColliding = true;
            entity.collidingWith = item;
          }
        });
      });
    }
  }, {
    key: 'register',
    value: function register(entity) {

      this.entities.get(entity.group).set(entity.uid, entity);
    }
  }, {
    key: 'getAssets',
    value: function getAssets(entity) {

      entity.assets = this.assets.get(entity.type);
    }
  }]);

  return Application;
})();

module.exports = Application;
},{"board":3,"bug":4,"event":6,"fps":8,"player":9,"utils":7}],3:[function(require,module,exports){
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
    this.group = 'stage';
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

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
},{"utils":7}],4:[function(require,module,exports){
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
},{"utils":7}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');

var Bullet = (function () {
  function Bullet(engine, event) {
    _classCallCheck(this, Bullet);

    this.engine = engine;
    this.event = event;

    this.type = 'bullet';
    this.group = 'collidable';
    this.side = 'rebels'; // empire|rebels, for ff mgmt
    this.uid = Utils.uid();

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 7.5;

    this.index = null;
    this.level = 1;
    this.velocity = 5;
    this.assets = null;
    this.angle = 0;

    this.bulletType = 'floppy';

    this.event.emit('getAssets', this); // call for global assets
    this.img = this.assets.get('images').get(this.bulletType);
  }

  _createClass(Bullet, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {

      this.x = this.x + this.velocity; // drift to right
      this.angle += 10;

      if (this.x > 640 || this.isColliding) {
        this.event.emit('kill', this);
      }

      this.angle += 4;
      if (this.angle % 360 === 0) this.angle = 0;
    }
  }, {
    key: 'render',
    value: function render() {

      this.engine.push();
      this.engine.translate(this.x, this.y);
      this.engine.angleMode(this.engine.DEGREES);
      this.engine.rotate(this.angle);
      this.engine.imageMode(this.engine.CENTER);
      this.engine.image(this.img, 0, 0);
      this.engine.pop();
    }
  }]);

  return Bullet;
})();

module.exports = Bullet;
},{"utils":7}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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

      return window.performance.now() * Math.random();
    }
  }, {
    key: 'throttle',

    /**
     * THANKS @TRO :)
     *
     * Ensure the methods calls are separeted by at least the given threshold.
     *
     * e.g.
     *
     *   var fn = throttle(callback, 100, console);
     *
     *   fn(); // perform the callback
     *   fn(); // do nothing
     *   ... 50 milliseconds later
     *   fn(); // do nothing
     *   ... 50 milliseconds later
     *   fn(); // perform the callback
     *   fn(); // do nothing
     *
     * @param {Function} fn
     * @param {int} threshhold
     * @param {mixed} context
     * @return {Function}
     */
    value: function throttle(fn, threshhold, context) {

      threshhold = threshhold || 250;
      context = context || this;

      var last = false;

      return function () {
        var args = arguments;
        var now = window.performance.now();

        if (last && now < last + threshhold) return;

        last = now;
        fn.apply(context, args);
      };
    }
  }]);

  return Utils;
})();

module.exports = Utils;
},{}],8:[function(require,module,exports){
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
},{"utils":7}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Utils = require('utils');
var Bullet = require('bullet');

var Player = (function () {
  function Player(engine, event) {
    _classCallCheck(this, Player);

    this.engine = engine;
    this.event = event;

    this.type = 'player';
    this.group = 'collidable';
    this.side = 'rebels'; // empire|rebels, for ff mgmt
    this.uid = Utils.uid();
    // console.log('uid:', this.uid);

    this.isColliding = false;
    this.collidingWith = null;

    this.x = 0;
    this.y = 0;
    this.width = this.height = this.radius = 20;

    this.level = 1;
    this.color = [255, 204, 0, 255];

    this.fireRate = 200 / this.level; // ms

    this.fireThrottle = Utils.throttle(this.fire, this.fireRate, this);
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'update',
    value: function update() {
      this.x = this.engine.mouseX;
      this.y = this.engine.mouseY;

      if (this.engine.mouseIsPressed) {
        this.fireThrottle();
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
  }, {
    key: 'fire',
    value: function fire() {

      var bullet = new Bullet(this.engine, this.event);
      bullet.x = this.x + 25;
      bullet.y = this.y;
      this.event.emit('register', bullet);
    }
  }]);

  return Player;
})();

module.exports = Player;
},{"bullet":5,"utils":7}]},{},[1])