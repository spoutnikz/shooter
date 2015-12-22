'use strict';

class Utils {


  static rand (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }


  static intersects (x1, y1, r1, x2, y2, r2) { // does two circles intersects?

    let distanceSq = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
    return Math.pow((r2 - r1), 2) <= distanceSq && distanceSq <= Math.pow((r1 + r2), 2);

  }


  static uid () {

    return window.performance.now() * Math.random();

  }

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
  static throttle (fn, threshhold, context) {

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

}

module.exports = Utils;
