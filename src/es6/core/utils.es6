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

    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-21963136
    // lookuptable
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }

    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];

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
