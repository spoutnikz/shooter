'use strict';

var Board = require('board');
var Fps = require('fps');
var Player = require('player');
var Bug = require('bug');
var Utils = require('utils');
var Event = require('event');

class Application {

  constructor ($container) {
    console.log('Application constructor');

    // define all entity maps
    this.entities = new Map();
    this.entities.set('collidable', new Map());
    this.entities.set('stage', new Map());

    // init event manager
    this.event = new Event();
    this.event.addListener('kill', this.kill.bind(this));
    this.event.addListener('register', this.register.bind(this));

    // init time
    this.initMs = null; // milliseconds, start of the game time
    this.initAmountBugs = 4;
    this.bugCount = 0;

    this.init();

  }


  /**
   * Init engine
   */
  init () {

    // p5 instance mode initializes this way
    this.engine = new p5((p) => {
      p.setup = this.setup.bind(this);
      p.draw = this.draw.bind(this);
    }, 'container');

  }


  /**
   * Engine setup
   */
  setup () {

    console.log('engine setup');
    window.p = this.engine;

    this.initMs = window.performance.now();

    // collision detection
    this.quad = new QuadTree({x: 0, y: 0, width: 640, height: 360}, false, 7);

    // create all entities and put them in maps
    let board = new Board(this.engine, this.event);
    let fps = new Fps(this.engine, this.event);
    let player = new Player(this.engine, this.event);
    this.entities.get('stage').set(board.uid, board);
    this.entities.get('stage').set(fps.uid, fps);
    this.entities.get('collidable').set(player.uid, player);

    for (let i = 0; i < this.initAmountBugs; i++) {
      let bug = new Bug(this.engine, this.event);
      this.entities.get('collidable').set(bug.uid, bug);
    };

    // init canvas
    this.engine.createCanvas(640, 360);
    this.engine.background(25, 25, 0);

  }


  /**
   * Engine loop
   */
  draw () {

    this.addBugs();

    // reset quad tree
    this.quad.clear();
    this.quad.insert(this.entities.get('collidable'));

    // collision detection
    this.collisions();

    // stage entities updates & renders
    this.entities.get('stage').forEach((entity) => {
      entity.update();
      entity.render(); // put in a separate loop?
    });

    // collidable entities updates & renders
    this.entities.get('collidable').forEach((entity) => {
      entity.update();
      entity.render(); // put in a separate loop?
    });


  }

 
  /**
   * Process kill request
   */
  kill (me) {

    if (me.type === 'bug') this.bugCount--;
    this.entities.get(me.group).delete(me.uid);

  }


  /**
   * Add more and more bugs over time
   */
  addBugs () {

    let diff = (window.performance.now() - this.initMs) / 10000;
    // x^2 * 0.2 + 4
    let amount = Math.round(diff * diff * 0.2 + this.initAmountBugs);

    // not great, player is included in the count
    if (this.bugCount < amount) {
      let bug = new Bug(this.engine, this.event);
      this.entities.get('collidable').set(bug.uid, bug);
      this.bugCount++;
    }

  }


  /**
   * Test all collidables against each other
   */
  collisions () {

    this.entities.get('collidable').forEach((entity, i) => {
      let items = this.quad.retrieve(entity);

      items.forEach((item) => {
        if ( (item.isColliding && entity.isColliding) || (entity.side === item.side) ) {
          return;
        }
        if (Utils.intersects(entity.x, entity.y, entity.radius, item.x, item.y, item.radius)) {
          entity.isColliding = true;
          entity.collidingWith = item;
        }
      });

    });

  }


  register (entity) {
    
    this.entities.get(entity.group).set(entity.uid, entity);

  }

}

module.exports = Application;
