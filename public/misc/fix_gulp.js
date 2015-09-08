// load the plugins
var gulp      = require('gulp'),
// var less   =  require('gulp-less'),
   plumber    = require('gulp-plumber'),
   gulp       = require('gulp-util'),
   clean      = require('gulp-clean'),
   browserify = require('gulp-browserify'),
   watch      = require('gulp-watch'),
   livereload = require('gulp-livereload'),
   minifyCSS  = require('gulp-minify-css'),
   rename     = require('gulp-rename'),
   jshint     = require('gulp-jshint'),
   stylish    = require('jshint-stylish'),
   notify     = require('gulp-notify'),
   include    = require('gulp-include'),
   sass       = require('gulp-sass'),
   concat     = require('gulp-concat'),
   uglify     = require('gulp-uglify'),
   ngAnnotate = require('gulp-ng-annotate'),
   nodemon    = require('gulp-nodemon');


var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  this.emit( 'end' );
}

// the nodemon task
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js scss html'
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
  // watch the sass file and run the css task
  // gulp.watch('public/assets/css/style.scss', ['scss']);
  livereload.listen();
  gulp.watch( 'public/assets/**/*.scss', [ 'scss'] );

  gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);

  gulp.watch( './**/*.js' ).on( 'change', function( file ) {
    livereload.changed( file );
  } );
} );

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
