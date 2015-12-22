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

      return window.performance.now() * Math.random();
    }
  }, {
    key: 'throttle',

    /**
     * THANKS @TRO :)
     * 
     * Ensure the methods calls are separeted by at least the given threshold.
     *
     * e.g.
     *
     *   var fn = throttle(callback, 100, console);
     *
     *   fn(); // perform the callback
     *   fn(); // do nothing
     *   ... 50 milliseconds later
     *   fn(); // do nothing
     *   ... 50 milliseconds later
     *   fn(); // perform the callback
     *   fn(); // do nothing
     *
     * @param {Function} fn
     * @param {int} threshhold
     * @param {mixed} context
     * @return {Function}
     */
    value: function throttle(fn, threshhold, context) {

      threshhold = threshhold || 250;
      context = context || this;

      var last = false;

      return function () {
        var args = arguments;
        var now = window.performance.now();

        if (last && now < last + threshhold) return;

        last = now;
        fn.apply(context, args);
      };
    }
  }]);

  return Utils;
})();

module.exports = Utils;