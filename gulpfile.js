var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var del = require('del');
var copy = require('gulp-copy');


gulp.task('watch', function () {
  gulp.watch('src/es6/**/*.es6', ['package']);
});


gulp.task('package', function() {

  del(['src/js/**', '!src/js', 'public/js/app.js', 'public/js/vendor/phaser-ce/build/phaser.min.js'], {force: 1}, function (err, deletedFiles) {

    if (err !== null) {
      console.log('ERROR while deleting files: ', err, deletedFiles);

    } else {
      console.log('DELETED: ', deletedFiles.length, ' js files');


      // transpile to es5
      gulp.src('src/es6/**/*.es6')
        .pipe(plumber(function (err) { console.log(err); this.emit('end'); }))
        .pipe(babel({}))
        .pipe(rename({extname: '.js'}))
        .pipe(gulp.dest('src/js'))
        .on('end', function (a,b,c) {
          console.log('ES6 -> ES5 transpile (babel) ENDED');

          // browserify / package app
          gulp.src('src/js/init.js', { read: false })
            .pipe(plumber(function (err) { console.log(err); this.emit('end'); }))
            .pipe(browserify({
              paths: ['./src/js', './src/js/core']
            }))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public/js'))
            .on('end', function () {
              console.log('PACKAGING (browserify) ENDED');

            });

        });

      gulp.src('node_modules/phaser-ce/build/phaser.min.js')
        .pipe(copy('public/js/vendor', {prefix: 1}))
        .on('end', function () {
          console.log('phaser library copied in public/js');

        });


    }
  });


});


gulp.task('default', ['watch']);