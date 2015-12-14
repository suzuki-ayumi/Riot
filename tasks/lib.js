var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var rename  = require('gulp-rename');
var webpack = require('gulp-webpack');
var uglify  = require('gulp-uglify');

var config = {
  src:            './app/lib.js',
  dest:           './dist/',
  bundleFilename: 'lib.js'
};

var task = { config: config };

task.lib = function() {
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(webpack())
    .pipe(uglify())
    .pipe(rename(config.bundleFilename))
    .pipe(gulp.dest(config.dest));
};

module.exports = task;
