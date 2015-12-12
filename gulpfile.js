var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');


gulp.task('watch', function () {
  gulp.watch('src/es6/**/*.es6', ['package']);
});

 
gulp.task('package', function() {

  // transpile to es5
  gulp.src('src/es6/**/*.es6')
    .pipe(plumber(function (err) { console.log(err); }))
    .pipe(babel({}))
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('src/js'))
    .on('end', function () {
      console.log('ES6 -> ES5 transpile (babel) OK');

      // browserify / package app
      gulp.src('src/js/init.js', { read: false })
      .pipe(plumber(function (err) { console.log(err); }))
        .pipe(browserify({paths: ['./src/js']}))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public/js'))
        .on('end', function () {
          console.log('PACKAGING (browserify) OK');
        });

    });

});


gulp.task('default', ['watch']);