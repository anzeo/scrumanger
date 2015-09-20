var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');

gulp.task('inject', ['templates'], function () {
    gulp.src('index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {relative: true, name: 'bower'}))
        .pipe(inject(gulp.src(['src/**/*.js', 'src/**/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('component-templates', function(){
    return gulp.src('src/components/**/*.html')
        .pipe(templateCache('templates.js', {module: 'scrumanger.components.templates', standalone: true}))
        .pipe(gulp.dest('./src/components'))
});
gulp.task('app-templates', function(){
    return gulp.src('src/app/**/*.html')
        .pipe(templateCache('templates.js', {module: 'scrumanger.templates', standalone: true}))
        .pipe(gulp.dest('./src/app'))
});

gulp.task('watch', function(){
    gulp.watch(['src/**/*', '!src/**/templates.js'], ['inject'])
});

gulp.task('templates', ['component-templates', 'app-templates']);

gulp.task('default', ['inject', 'watch']);