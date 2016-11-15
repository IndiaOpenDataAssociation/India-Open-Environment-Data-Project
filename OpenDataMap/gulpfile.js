var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();
var cssmin = require('gulp-cssmin');
gulp.task('css', function() {
  return gulp.src('./styles/main.scss')
           .pipe($.sourcemaps.init())
           .pipe($.sass().on('error', $.sass.logError))
           .pipe($.autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
           }))
           .pipe($.sourcemaps.write())
            .pipe(cssmin())
           .pipe(gulp.dest('./dist'));
})

gulp.task('css:watch', function() {
  gulp.watch('./styles/**/*.scss', ['css']);
});

gulp.task('css:build', ['css'], function() {
  return gulp.src('./dist/main.css')
             .pipe($.rev())
             .pipe(gulp.dest('./dist'))
             .pipe($.rev.manifest())
             .pipe(gulp.dest('./dist'));
})

gulp.task('images', function() {
  return gulp.src('./assets/**/*')
    // Pass in options to the task
    .pipe(gulp.dest('./dist/assets'));
});


gulp.task('fonts', function() {
  return gulp.src('./fonts/**/*')
    // Pass in options to the task
    .pipe(gulp.dest('./dist/fonts'));
});
