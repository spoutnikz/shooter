'use strict';

class GameView {

  constructor (gameModel, engine) {
    this.gameModel = gameModel;
    this.engine = engine;
    console.log('GameView constructor, model, engine: ', this.gameModel, this.engine);

    this.init();

  }

  init () {
    this.engine.createCanvas(700, 700);
    this.engine.background(25, 25, 0);
  }


  render () {
    // console.log('gameView render');

    let playerModel = this.gameModel.playerModel;
    let position = playerModel.position;
    let dimensions = playerModel.dimensions;
    let color = playerModel.color;

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

}

module.exports = GameView;
