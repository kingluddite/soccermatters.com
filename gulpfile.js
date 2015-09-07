// load the plugins
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');

// the nodemon task
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js less html'
  })
  .on('start', ['watch'])
  .on('change', ['watch'])
  .on('restart', function() {
    console.log('Restarted!');
  });
});

// defining the main gulp task
gulp.task('default', ['nodemon']);

gulp.task('watch', function() {
  // watch the less file and run the css task
  gulp.watch('public/assets/css/style.less', ['css']);

  gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
});

gulp.task('angular', function() {
  return gulp.src(['public/assets/libs/angular/angular.js', 'public/assets/libs/angular-route/angular-route.js', 'public/assets/libs/angular-animate/angular-animate.js', 'public/app/*.js', 'public/app/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(ngAnnotate())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'));
});

// task to lint, minify, and concat frontend files
gulp.task('scripts', function() {
  return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'));
});

// task for linting js files
gulp.task('js', function() {

  return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// define a task called css
gulp.task('css', function() {

  // grab the less file, process the LESS, save to style.css
  return gulp.src('public/assets/css/style.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/assets/css'));
});
