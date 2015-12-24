var path        = require('path');
var gulp        = require('gulp');
var browserSync = require('browser-sync');

var bundleTask;
var libTask     = require('./tasks/lib');
var configTask  = require('./tasks/generate-config');

if (process.env.NODE_ENV === 'production') {
  bundleTask = require('./tasks/bundle-production');
} else {
  bundleTask = require('./tasks/bundle');
}

// Discrete tasks
gulp.task('bundle-js',     bundleTask.js);
gulp.task('bundle-css',    bundleTask.css);
gulp.task('bundle-config', configTask.bundle);
gulp.task('bundle',        ['bundle-js', 'bundle-css']);
gulp.task('lib',           libTask.lib);

// Development build, also prodction build if use NODE_ENV=production.
gulp.task('build',   ['bundle-config', 'bundle', 'lib']);
gulp.task('default', ['build']);

// Run server and watch file changes
gulp.task('watch', ['bundle'], function() {
  gulp.watch(bundleTask.config.zjs.watch,  ['bundle-js',  browserSync.reload]);
  gulp.watch(bundleTask.config.css.watch, ['bundle-css', browserSync.reload]);

  browserSync({
    https: false,
    server: {
      baseDir: './dist',
      logLevel: 'debug',
    },
    open: false
  });
});
