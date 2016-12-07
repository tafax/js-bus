'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');
const conventionalChangelog = require('gulp-conventional-changelog');
const bump = require('gulp-bump');
const clean = require('gulp-clean');
const typedoc = require("gulp-typedoc");

// Constants.
const source = './src/**/*.ts';
const destination = './dist';

// Creates a ts compiler.
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
  return gulp.src(destination, { read: false })
    .pipe(clean());
});

gulp.task('compile', function() {
  var tsResult = gulp.src(source)
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return merge([
    tsResult.dts
      .pipe(gulp.dest(destination)),
    tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(destination))
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
    .src(source)
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
