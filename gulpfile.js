var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();


gulp.task('serve', function() {
    browserSync.init({
        port: 4080,
        server: {
            baseDir: './',
        },
        ui: {
            port: 4000
        }

    });
    gulp.watch('./src/assets/sass/**/*.scss', ['styles']);
    gulp.watch('./src/assets/js/**/*.js', ['js']);
    gulp.watch(['**/*.html'], ['html']);
});

gulp.task('styles', function() {
    return gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('./src/assets/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('js', function() {
    return gulp.src(['./src/assets/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            //look for supported gulp-sourcemap plugins
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});



gulp.task('default', ['styles', 'js', 'images', 'serve']);
