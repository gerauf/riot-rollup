var gulp = require('gulp')
var webserver = require('gulp-webserver')
var shell = require('gulp-shell')
var path = require('path')
var join = path.join
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del')
var runSequence = require('run-sequence')
var less = require('gulp-less')
var sourcemaps = require('gulp-sourcemaps')


gulp.task('serve', function(){
  var dir = ['dest', 'node_modules', 'bower_components']
  gulp.src(dir)
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('wiredep', function(){
  var depFiles = bowerFiles()

  var pathReplace = function(filePath, dir) {

    dir = dir || '/bower_components/'

    var fp

    if(typeof dir === 'string') {
      fp = filePath.replace(dir,'')
    } else {
      dir.forEach(function(d){
        if (filePath.indexOf(d)>-1) {
          fp = filePath.replace(d,'')
        }
      })
    }

    var isJs = filePath.indexOf('.js') > -1
    if (isJs) {
      return '<script src="' + fp + '"></script>'
    }
    return '<link rel="stylesheet" type="text/css" href="' + fp + '" />'
  }

  return gulp.src(join('src', 'index.html'))
             .pipe(inject(
               gulp.src(
                 depFiles,
                 {read:false}),
                 {
                   name: 'bower',
                   transform: function(filePath) {
                     return pathReplace(filePath)
                   }
                 }
             ))
             .pipe(gulp.dest('./dest'))
})

gulp.task('rollup:clean', function(){
  return del([
    join('dest','bundle.js')
  ])
})

gulp.task('rollup:c', shell.task([
  'rollup -c'
]));

gulp.task('rollup', function(done) {
  runSequence(
    'rollup:clean',
    'rollup:c',
    done
  )
})

gulp.task('less', function() {
  return gulp.src(join('src','style','style.less')
             .pipe(sourcemaps.init())
             .pipe(less())
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(
               join('dest', 'css')
             )))
})

gulp.task('watch', function(){
  gulp.watch([join('src','**','*.tag'), join('src','main.js')], ['rollup']);
  gulp.watch(['bower.json' , join('src','index.html')] , ['wiredep']);
  gulp.watch([join('src','style','style.less')], ['less'])
});

gulp.task('default', function(done){
  runSequence(
    'rollup',
    'less',
    'wiredep',
    'serve',
    'watch',
    done
  )
});
