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