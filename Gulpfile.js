'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');
const conventionalChangelog = require('gulp-conventional-changelog');
const bump = require('gulp-bump');
const clean = require('gulp-clean');
const typedoc = require("gulp-typedoc");
const git = require('gulp-git');
const tagVersion = require('gulp-tag-version');

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
      preset: 'angular',
      releaseCount: 0
    }))
    .pipe(gulp.dest('./'));
});

var bumpVersion = function(type) {
  return gulp.src('./package.json')
    .pipe(bump({ type: type }))
    .pipe(gulp.dest('./'));
};

gulp.task('bump', bumpVersion.bind(bumpVersion, 'path'));
gulp.task('bump-minor', bumpVersion.bind(bumpVersion, 'minor'));
gulp.task('bump-major', bumpVersion.bind(bumpVersion, 'major'));

gulp.task('tag', function() {
  return gulp.src('./package.json')
    .pipe(tagVersion());
});

gulp.task('commit', function() {
  return gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit('Release new version'));
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

gulp.task('default', function() {
  return runSequence(
    'clean',
    'compile'
  );
});

gulp.task('release', function() {
  return runSequence(
    'default',
    'typedoc',
    'bump',
    // TODO: Why no changelog?
    //'changelog',
    'commit',
    'tag'
  )
});
