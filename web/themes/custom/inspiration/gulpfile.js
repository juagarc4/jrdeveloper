const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const srcFolder = __dirname + '/src';
const distFolder = __dirname + '/assets';
const jsFolder = 'js';
const scssFolder = 'scss';
const cssFolder = 'css';

const bsProxy = 'http://jrdeveloper.dev:8888/';

//

gulp.task('browser-sync', function () {

  'use strict';

  if (bsProxy) {
    browserSync.init({
      proxy: bsProxy
    });
  }
  else {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
  }
});

gulp.task('build-scss', function () {

  'use strict';

  gulp.src(`${srcFolder}/${scssFolder}/**/*.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(`${distFolder}/${cssFolder}`))
      .pipe(browserSync.stream());
});

gulp.task('build-js', function () {

  'use strict';

  gulp.src(`${srcFolder}/${jsFolder}/**/*.js`)
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(`${distFolder}/${jsFolder}`));
});

gulp.task('default', ['browser-sync', 'build-scss', 'build-js'], function () {

  'use strict';

  gulp.watch(`${srcFolder}/${scssFolder}/**/*.scss`, ['build-scss']);
  gulp.watch(`${srcFolder}/${jsFolder}/**/*.js`, ['build-js']);
  gulp.watch(`${distFolder}/${jsFolder}/**/*.js`).on('change', browserSync.reload);
});

