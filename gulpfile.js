var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var responsive = require('gulp-responsive-images');
var runSequence = require('run-sequence');

gulp.task('copy', [
  'copy:html',
  'copy:assets'
]);

gulp.task('copy:html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy:assets', [
  'copy:audio',
  'copy:data',
  'copy:svg'
]);

gulp.task('copy:audio', function () {
  return gulp.src('./src/audio/*')
    .pipe(gulp.dest('./dist/audio/'));
});

gulp.task('copy:data', function () {
  return gulp.src('./src/data/*')
    .pipe(gulp.dest('./dist/data/'));
});

gulp.task('copy:svg', function () {
  return gulp.src('./src/images/*.svg')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('compileSprites', function(cb) {
  runSequence('resizeImages', 'spritesheet', cb);
});

gulp.task('resizeImages', function () {
  return gulp.src('./src/images/*')
    .pipe(plumber())
    .pipe(responsive({
      'intro_gif.gif': [{}],
      'bikeframe1.png': [{
        width: 360
      }],
      'tree1.png': [{
        width: 68
      }],
      'firstbush1.png': [{
        width: 164
      }],
      'secondbush1.png': [{
        width: 161
      }],
      'arm1.png': [{
        width: 182
      }],
      'paper1.png': [{
        width: 63
      }],
      'wheel*.png': [{
        width: 243
      }],
      'basic*.png': [{
        width: 920
      }],
      'rocko*.png': [{
        width: 742
      }],
      'barbie*.png': [{
        width: 477
      }],
      'phil*.png': [{
        width: 671
      }],
      'snow*.png': [{
        width: 834
      }],
      'window*.png': [{
        width: 132
      }],
      'door*.png': [{
        width: 100
      }],
      'skinnydoor*.png': [{
        width: 72
      }],
      'man*.png': [{
        width: 354
      }],
      'leg*.png': [{
        width: 309
      }],
      'puff*.png': [{}]
    }))
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('spritesheet', shell.task([
  'node_modules/.bin/spriter dist/images/ -i dist/images -d dist/data'
], { ignoreErrors: true }));
 
gulp.task('browserify', function() {
  return browserify('./src/js/main.js')
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['copy:html']);
  gulp.watch(['src/audio/*'], ['copy:audio']);
  gulp.watch(['src/data/*'], ['copy:data']);
  gulp.watch(['src/images/*'], ['compileSprites']);
  gulp.watch(['src/images/*.svg'], ['copy:svg']);
  gulp.watch(['src/js/**/*.js'], ['browserify', 'lint']);
});

gulp.task('default', ['copy', 'browserify', 'compileSprites', 'lint', 'watch']);
