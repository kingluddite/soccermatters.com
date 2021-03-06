// grab our gulp packages
var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    sass       = require('gulp-sass'),
    minifyCSS  = require('gulp-minify-css'),
    rename     = require('gulp-rename'),
    jshint     = require('gulp-jshint'),
    stylish    = require('jshint-stylish'),
    notify     = require('gulp-notify'),
    include    = require('gulp-include'),
    livereload = require('gulp-livereload'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber    = require('gulp-plumber');

var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  this.emit( 'end' );
}

// // create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

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

// define a task called css
gulp.task('scss', function() {

  // grab the sass file, process the SASS, save to style.css
  return gulp.src('public/assets/css/scss/style.scss')
        .pipe( plumber( { errorHandler: onError } ) )
        .pipe( sass() )
        .pipe( gulp.dest( '.' ) )
        .pipe( minifyCSS() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( 'public/assets/css' ) )
        .pipe( livereload() );
} );
