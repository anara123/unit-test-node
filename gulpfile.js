'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var path = require('path');
var nodeDebug = require('gulp-node-debug');


gulp.task('mocha', function() {

	return gulp.src(['test/*.js'], {read: false})
			.pipe(mocha({reporter: 'spec'}))
			.on('error', gutil.log);

});

gulp.task('watch-mocha', function() {

	gulp.run('mocha');
	gulp.watch(['./**/*.js', 'tests/**/*.js'], ['mocha']);
});


gulp.task('test', function (cb) {
  gulp.src(['src/**/*.js', 'main.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
});

gulp.task('default', ['watch-mocha']);


gulp.task('debugTest', function() {
 
    var mochaScript = path.join(__dirname, 'node_modules/mocha/bin/_mocha');
 
    gulp.src([mochaScript])
        .pipe(nodeDebug({
            debugBrk: true,
            script: ['--watch'],
        }));
});