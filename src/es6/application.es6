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

    this.entities = new Map();
    this.entities.set('collidable', new Map());
    this.entities.set('stage', new Map());

    this.event = new Event();
    this.event.addListener('kill', this.kill.bind(this));

    this.init();

  }

  init () {
    this.engine = new p5((p) => {
      p.setup = this.setup.bind(this);
      p.draw = this.draw.bind(this);
    }, 'container');
  }


  setup () {
    console.log('engine setup');
    window.p = this.engine;


    // collision detection
    this.quad = new QuadTree({x: 0, y: 0, width: 640, height: 360}, false, 7);


    // create all entities and put them in maps
    let board = new Board(this.engine, this.event);
    let fps = new Fps(this.engine, this.event);
    let player = new Player(this.engine, this.event);

    this.entities.get('stage').set(board.uid, board);
    this.entities.get('stage').set(fps.uid, fps);
    this.entities.get('collidable').set(player.uid, player);

    for (let i = 0; i < 50; i++) {
      let bug = new Bug(this.engine, this.event);
      this.entities.get('collidable').set(bug.uid, bug);
    };


    // init canvas
    this.engine.createCanvas(640, 360);
    this.engine.background(25, 25, 0);
  }

  // main loop
  draw () {
    

    // reset quad tree
    this.quad.clear();
    this.quad.insert(this.entities.get('collidable'));

    
    // collision detection
    this.entities.get('collidable').forEach((entity, i) => {
      let items = this.quad.retrieve(entity);
      items.forEach((item) => {
        if ( (item.isColliding && entity.isColliding) || (entity.type === item.type) ) {
          return;
        }
        if (Utils.intersects(entity.x, entity.y, entity.radius, item.x, item.y, item.radius)) {
          entity.isColliding = true;
          entity.collidingWith = item;
        }
      });
    });


    // entities updates & renders
    this.entities.get('stage').forEach((entity) => {
      entity.update();
      entity.render(); // put in a separate loop?
    });

    this.entities.get('collidable').forEach((entity) => {
      entity.update();
      entity.render(); // put in a separate loop?
    });


  }

  kill (me) {

    this.entities.get('collidable').delete(me.uid);

  }

}

module.exports = Application;
