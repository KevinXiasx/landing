var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var fs = require('fs');

var DEST_CSS = 'public/css/';
gulp.task('css', function() {
  return gulp.src('public/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(DEST_CSS));
});


var DEST_JS = 'public/javascripts/';
gulp.task('js', function() {
  return gulp.src('public/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(DEST_JS));
});

var DEST_EJS = 'views/';
gulp.task('ejs', function() {
  return gulp.src('views/**/**/**/*.ejs')
    .pipe(htmlmin({collapseWhitespace: true}))
    //.pipe(rename({"extname":".min.ejs"}))
    .pipe(gulp.dest(DEST_EJS));
});

gulp.task('default', function () {
	 gulp.start('css', 'js', 'ejs');
});