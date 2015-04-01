/* global require */
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

var inputPaths = {
  templates: ['src/**/*.html'],
  less: ['src/**/*.less'],
  scripts: ['src/**/*.js'],
  bower: ['bower_components/**/*']
};

var outputPaths = {
    templates: 'public/',
    css: 'public/css',
    scripts: 'public/js',
    media: 'public/media',
    bower: 'public/lib'
};

gulp.task('templates', function () {
  gulp.src(inputPaths.templates)
    .pipe(gulp.dest(outputPaths.templates))
    .pipe(livereload());
});

gulp.task('less', function () {
  gulp.src(inputPaths.less)
    .pipe(plumber())
    .pipe(less({
      paths: ['bower_components/lesshat/build']
    }))
    .pipe(gulp.dest(outputPaths.css))
    .pipe(livereload());
});

gulp.task('scripts', function () {
  gulp.src(inputPaths.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(outputPaths.scripts))
    .pipe(livereload());
});

gulp.task('bower', function () {
  gulp.src(inputPaths.bower)
    .pipe(gulp.dest(outputPaths.bower))
    .pipe(livereload());
});

gulp.task('clean', function () {
    return gulp.src('public', {read: false})
        .pipe(clean());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen({
    start: true
  });
  gulp.watch(inputPaths.templates, ['templates']);
  gulp.watch(inputPaths.less, ['less']);
  gulp.watch(inputPaths.scripts, ['scripts']);
  gulp.watch(inputPaths.bower, ['bower']);
});

gulp.task('build', [
  'templates',
  'less',
  'scripts',
  'bower']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'watch',
  'build'
]);
