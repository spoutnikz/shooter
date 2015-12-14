'use strict';

var BugModel = require('bugModel');
var PlayerModel = require('playerModel');

class GameModel {

  constructor () {
    console.log('GameModel constructor');

    this._playerModel = new PlayerModel();
    this._bugModels = [];

    for (let i = 0; i < 4; i++) {
        this.bugModels.push(new BugModel());
    }

    console.log('gameModel: playerModel, bugModels:', this._playerModel, this.bugModels);

  }

  get playerModel () {
    return this._playerModel;
  }

  get bugModels () {
    return this._bugModels;
  }

}

module.exports = GameModel;
