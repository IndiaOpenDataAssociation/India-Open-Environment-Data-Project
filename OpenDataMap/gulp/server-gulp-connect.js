'use strict';

var gulp = require('gulp');
var util = require('util');
var conf = require('./conf');
var path = require('path');
var connect = require('gulp-connect');

module.exports = function(options) {

  function createServerTask(name, pre, root) {
    gulp.task(name, pre, function() {
      connect.server({
        root: root,
        port: 3000,
        debug: true,
        livereload: true
      });
    });
  }

  createServerTask( 'serve', ['watch'], [ options.tmp+'/serve', options.src, './' ]);

  createServerTask( 'serve:dist', ['build'], [ options.dist ]);

  createServerTask( 'serve:e2e', ['inject'], [ options.tmp+'/serve', options.src, './' ]);

  createServerTask( 'serve', ['watch'], [ options.tmp+'/serve', options.src, './' ]);

  createServerTask( 'serve:e2e-dist', ['build'], [ options.dist ]);

};

gulp.task('serve', ['watch'], function () {
  module.exports(conf.paths);
});

gulp.task('serve:dist', ['build'], function () {
 module.exports(conf.paths);
}); 

gulp.task('serve:e2e', ['inject'], function () {
  module.exports(conf.paths);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  module.exports(conf.paths);
});
