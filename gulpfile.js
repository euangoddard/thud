var gulp = require('gulp');

var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');


gulp.task('build', function () {
    return gulp.src('./src/**/*.es6')
        .pipe(babel())
        .pipe(rename(function (path) {
        	path.extname = ".js"
    	}))
        .pipe(gulp.dest('./dist'));
});


gulp.task('test', ['build'], function () {
	return gulp.src('./dist/**/test*.js', {read: false})
        .pipe(mocha());
});


gulp.task('watch', ['build'], function() {
    gulp.watch('./src/**/*', ['build']);
});


gulp.task('default', ['build']);