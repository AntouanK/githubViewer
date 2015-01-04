
'use strict';

var gulp          = require('gulp'),
    gulpLess      = require('gulp-less'),
    gulpSize      = require('gulp-size'),
    gulpUglify    = require('gulp-uglify'),
    gulpIf        = require('gulp-if'),
    gulpMinCSS    = require('gulp-minify-css'),
    gulpEslint    = require('gulp-eslint'),
    gulpRename    = require('gulp-rename'),
    staticServer  = require('gulp-serve'),
    rimraf        = require('rimraf'),
    path          = require('path'),
    browserify    = require('browserify'),
    vinylSource   = require('vinyl-source-stream'),
    buffer        = require('vinyl-buffer'),
    runSequence   = require('run-sequence'),
    paths         = {},
    cwd           = process.cwd(),
    ENV;


paths.entryScript = path.join(cwd, 'client', 'scripts', 'entry.jsx');
paths.scripts     = path.join(cwd, 'client', 'scripts', '**/*');
paths.js          = path.join(cwd, 'client', 'scripts', '**/*.js');
paths.styles      = path.join(cwd, 'client', 'styles', '**/*.less');
paths.stylesMain  = path.join(cwd, 'client', 'styles', 'main.less');
paths.deploy      = path.join(cwd, 'client', 'deploy');
paths.htmlFile    = path.join(cwd, 'client', 'index.html');


/**********************************************************/
gulp.task('clean.deploy', function(done){
  rimraf(paths.deploy, done);
});



gulp.task('lint', function(){

  return gulp.src(paths.js)
  .pipe( gulpEslint({ config: '.eslintrc' }) )
  .pipe( gulpEslint.format() );
});


gulp.task('build.bundle', ['lint'], function(){

  return browserify({ debug: ENV === 'dev' , entries: paths.entryScript })
  .transform('reactify')
  .bundle()
  .pipe(vinylSource('bundle.js'))
  .pipe( gulpIf( ENV !== 'dev', buffer() ) )
  .pipe( gulpIf( ENV !== 'dev', gulpUglify() ) )
  .pipe( gulpIf( ENV !== 'dev', gulpSize() ) )
  .pipe(gulp.dest(paths.deploy));
});


gulp.task('copy.markUp', function(){

  return gulp.src([ paths.htmlFile ])
  .pipe(gulp.dest(paths.deploy));
});


gulp.task('styles', function(){

  var stream =
  gulp.src(paths.stylesMain)
  .pipe(gulpLess())
  .pipe( gulpIf( ENV !== 'dev', gulpMinCSS() ) )
  .pipe(gulpSize())
  .pipe( gulpRename('main.css') )
  .pipe(gulp.dest(paths.deploy));

  stream.on('error', function(err){
    console.log('err', err);
  });

  return stream;
});

gulp.task('serve', staticServer({
  root: paths.deploy,
  port: 4000
}));



gulp.task('dev', function(){

  ENV = 'dev';

  return runSequence(
    ['clean.deploy'],
    ['build.bundle', 'copy.markUp', 'styles']
  );
});

gulp.task('production', function(){

  ENV = 'production';

  return runSequence(
    ['clean.deploy'],
    ['build.bundle', 'copy.markUp', 'styles']
  );
});

gulp.task('watch.dev', ['dev'], function(){

  gulp.watch(paths.htmlFile, ['copy.markUp']);
  gulp.watch(paths.scripts, ['build.bundle']);
  gulp.watch(paths.styles, ['styles']);
});
