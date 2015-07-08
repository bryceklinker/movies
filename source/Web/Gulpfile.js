var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
    dest: 'wwwroot',
    appjs: [
        'wwwroot/app/movies.js',
        'wwwroot/app/general/**/*.js',
        'wwwroot/app/**/*.js'
    ],
    thirdpartyjs: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.min.js'
    ],
    css: [
        'bower_components/bootstrap/dist/css/*.min.css'
    ],
    fonts: [
        'bower_components/bootstrap/dist/fonts/*.*'
    ]
};

gulp.task('watch', function() {
    gulp.watch(paths.appjs, ['default']);
});

gulp.task('default', function () {
    gulp.src(paths.appjs)
        .pipe(concat('movies.min.js'))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest(paths.dest + '/js'));

    gulp.src(paths.thirdpartyjs)
        .pipe(gulp.dest(paths.dest + '/js'));

    gulp.src(paths.css)
        .pipe(gulp.dest(paths.dest + '/css'));

    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dest + '/fonts'));
});