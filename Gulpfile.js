
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var sourcemaps = require('gulp-sourcemaps');
var conventionalChangelog = require('gulp-conventional-changelog');
var bump = require('gulp-bump');
var clean = require('gulp-clean');
var typedoc = require("gulp-typedoc");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
  return gulp.src('./lib', { read: false })
    .pipe(clean());
});

gulp.task('compile', function() {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return merge([
    tsResult.dts
      .pipe(gulp.dest('./lib')),
    tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./lib'))
  ]);
});

gulp.task('changelog', function () {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bump', function(){
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
  gulp.src('./package.json')
    .pipe(bump({ type:'minor' }))
    .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function(){
  gulp.src('./package.json')
    .pipe(bump({ type:'major' }))
    .pipe(gulp.dest('./'));
});

gulp.task('typedoc', function() {
  return gulp
    .src('./src/**/*.ts')
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es6',
      includeDeclarations: true,

      out: './doc',

      name: 'js-bus',
      ignoreCompilerErrors: false,
      version: true,
    }))
    ;
});

gulp.task('default', ['clean', 'compile']);
gulp.task('release', ['default', 'bump', 'changelog', 'typedoc']);
