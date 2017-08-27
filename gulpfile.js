var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
// var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');

var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// var install = require("gulp-install");

// gulp.task('default', ['scripts', 'less', 'minify-css'], function() {});
gulp.task('default', ['less', 'minify-css'], function() {});

gulp.task('minify-css', ['clean-style'], function() {
    return gulp.src('css/**/*.css')
        .pipe(concatCss('style.min.css'))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/min'));
});

gulp.task('less', function () {
    return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
        .pipe(gulp.dest('css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['less/**/*.less', 'js/**/*.*'], ['default']);
});

// Delete style
gulp.task('clean-style', function () {
    return gulp.src('css/min/*.css', {read: false})
    .pipe(clean());
});

// Server
gulp.task('server', ['default'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });

    gulp.watch(['less/**/*.less', 'js/**/*.*'], ['default']).on('change', browserSync.reload);
});


// Install
// gulp.task('install', function () {
//   return gulp.src(['./package.json'])
//     .pipe(install());
// });
