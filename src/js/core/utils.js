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

      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-21963136
      // lookuptable
      var lut = [];for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
      }

      var d0 = Math.random() * 4294967295 | 0;
      var d1 = Math.random() * 4294967295 | 0;
      var d2 = Math.random() * 4294967295 | 0;
      var d3 = Math.random() * 4294967295 | 0;

      return lut[d0 & 255] + lut[d0 >> 8 & 255] + lut[d0 >> 16 & 255] + lut[d0 >> 24 & 255] + '-' + lut[d1 & 255] + lut[d1 >> 8 & 255] + '-' + lut[d1 >> 16 & 15 | 64] + lut[d1 >> 24 & 255] + '-' + lut[d2 & 63 | 128] + lut[d2 >> 8 & 255] + '-' + lut[d2 >> 16 & 255] + lut[d2 >> 24 & 255] + lut[d3 & 255] + lut[d3 >> 8 & 255] + lut[d3 >> 16 & 255] + lut[d3 >> 24 & 255];
    }
  }]);

  return Utils;
})();

module.exports = Utils;