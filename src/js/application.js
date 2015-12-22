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