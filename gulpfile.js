var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');

gulp.task('inject', ['templates'], function () {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {relative: true, name: 'bower'}))
        .pipe(inject(gulp.src(['src/**/*.js', 'src/**/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./'));

});

gulp.task('templates', function(){
    return gulp.src('src/**/*.html')
        .pipe(templateCache('templates.js', {module: 'scrumanger.templates', standalone: true}))
        .pipe(gulp.dest('./src'))
});

gulp.task('default', ['templates', 'inject']);
