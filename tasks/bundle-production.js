var _            = require('lodash');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var webpack      = require('gulp-webpack');
var uglify       = require('gulp-uglify');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');

var config = {};

config = _.extend(require('./bundle').config, config);

var task = { config: config };

task.js = function() {
  gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(webpack(config.js.webpack))
    .pipe(uglify())
    .pipe(rename(config.js.bundleFilename))
    .pipe(gulp.dest(config.js.dest));
};

task.css = function() {
  gulp.src(config.css.src)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({ browsers: config.css.requirementBrowsers }))
    .pipe(csso())
    .pipe(rename(config.css.bundleFilename))
    .pipe(gulp.dest(config.css.dest));
};

module.exports = task;
