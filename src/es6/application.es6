'use strict';

var GameController = require('gameController');

class Application {

  constructor ($container) {
    
    console.log('Application constructor, new gameController: ', this.gameController, p5);
    this.x = 0;
    this.y = 0;
    this.up = true;

    this.engine = new p5((p) => {
      p.setup = this.setup.bind(this);
      p.draw = this.draw.bind(this);
    });

  }


  setup () {
    console.log('engine setup');
    this.gameController = new GameController(this.engine);
  }

  // game main loop
  draw () {
    // console.log('engine draw loop');
    this.gameController.update();
    this.gameController.render();

  }

}

module.exports = Application;
