var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');

var paths = {
    src: {
        specs: './spec/**/*Spec.js',
        libcss: [
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        libjs: [
            './bower_components/jquery/dist/js/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/reqct/react.min.js'
        ],
        clientjs: [
            './src/client/**/*.js'
        ]
    },
    dest: {
        css: './src/client/dist/css',
        js: './src/client/dist/js'
    }
};

gulp.task('css', function(){
    gulp.src(paths.src.libcss)
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('libjs', function(){
    gulp.src(paths.src.libjs)
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('clientjs', function(){
    gulp.src(paths.src.clientjs)
        .pipe(browserify())
        .pipe(concat('movies.js'))
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('jasmine', function(){
    gulp.src(paths.src.specs)
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
})

gulp.task('dist', ['css', 'libjs', 'clientjs'], function(){

});

gulp.task('test', ['libjs', 'clientjs', 'jasmine'], function(){

});