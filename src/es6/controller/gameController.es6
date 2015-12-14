'use strict';

var GameModel = require('gameModel');
var GameView = require('gameView');

class GameController {

  constructor (engine) {
    this.engine = engine;
    this.gameModel = new GameModel();
    this.gameView = new GameView(this.gameModel, this.engine);
    console.log('GameController constructor');
  }

  update () {
    let playerModel = this.gameModel.playerModel;
    playerModel.position = [this.engine.mouseX, this.engine.mouseY];
  }

  render () {
    this.gameView.render();
  }

}

module.exports = GameController;
