var path         = require('path');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var webpack      = require('gulp-webpack');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  js: {
    watch:               ['./app/**/*.js', './app/**/*.jsx'],
    src:                 './app/app.jsx',
    dest:                './dist/',
    bundleFilename:      'bundle.js',
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony',
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          }
        ]
      },
      externals: {
        'react':        'React',
        'react-router': 'Router',
        'lodash':       '_',
        'jquery':       '$',
        'async':        'async',
        'bluebird':     'Promise',
        'moment':       'moment',
        'cheet.js':     'cheet',
      },
      resolve: {
        extenstions: ['', '.js', '.jsx']
      }
    }
  },
  css: {
    watch:               './app/**/*.less',
    src:                 './app/app.less',
    dest:                './dist/',
    bundleFilename:      'bundle.css',
    requirementBrowsers: ['Explorer >= 8', 'Chrome >= 27', 'Firefox >= 21', 'Android >= 2.3', 'iOS >= 5.1'],
  }
};

var tasks = { config: config };

task.js = function() {
  gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(webpack(config.js.webpack))
    .pipe(rename(config.js.bundleFilename))
    .pipe(gulp.dest(config.js.dest));
};

task.css = function() {
  gulp.src(config.css.src)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({ browsers: config.css.requirementBrowsers }))
    .pipe(rename(config.css.bundleFilename))
    .pipe(gulp.dest(config.css.dest));
};

exports default tasks;
