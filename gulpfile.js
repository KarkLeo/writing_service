'use strict';
 
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    tinypng = require('gulp-tinypng'),
    svgmin = require('gulp-svgmin');

gulp.task('pug', function buildHTML() {
  return gulp.src('src/**/*.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream:true
  }));
});
 
gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('svg', function () {
  return gulp.src('src/img/svg/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./img/svg/'))
      .pipe(browserSync.reload({
        stream:true
      }));
});

gulp.task('img:dev', function () {
  return gulp.src('src/img/**/*.{png,jpg,PNG,JPG}')
      .pipe(gulp.dest('./img/'))
      .pipe(browserSync.reload({
        stream:true
      }));
});
gulp.task('img:build', function () {
  return gulp.src('src/img/**/*.{png,jpg}')
      .pipe(tinypng('O263Rv64Vgs3x7tUUpk0glu8C8Nh0OMB'))
      .pipe(gulp.dest('./img'));
});
 
//----------

gulp.task('watch', function () {
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/img/svg/**/*.svg', gulp.series('svg'));
  gulp.watch('src/img/**/*', gulp.series('img:dev'));
});

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'scss', 'svg', 'img:dev'),
  gulp.parallel('watch', 'server')
));

gulp.task('build', gulp.series(
  gulp.parallel('pug', 'scss', 'svg', 'img:build'),
  gulp.parallel('watch', 'server')
));