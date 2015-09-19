var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

gulp.task('inject', function () {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {relative: true, name: 'bower'}))
        .pipe(inject(gulp.src('src/**/*.js', {read: false}), {relative: true}))
        .pipe(gulp.dest('./'));

});

gulp.task('default', ['inject']);
