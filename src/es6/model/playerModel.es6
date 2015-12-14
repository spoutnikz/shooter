'use strict';

class PlayerModel {

  constructor () {
    this._position = [0, 0];
    this._level = 1;
    this._dimensions = [50, 50];
    this._color = [255, 204, 0];
    console.log('PlayerModel constructor');

  }

  get position () {
    return this._position;
  }

  set position (position) {
    this._position = position;
  }

  get level () {
    return this._level;
  }

  set level (level) {
    if (level > 0 && level <=5) this._level = level;
  }

  get dimensions () {
    return this._dimensions;
  }

  set dimensions (dimensions) {
    this._dimensions = dimensions;
  }

  get color () {
    return this._color;
  }

  set color (color) {
    this._color = color;
  }

}

module.exports = PlayerModel;
