var gulp = require('gulp')
var webserver = require('gulp-webserver')
var shell = require('gulp-shell')
var path = require('path')
var join = path.join
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');


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

gulp.task('rollup', shell.task([
  'rollup -c'
]));

gulp.task('watch', function(){
  gulp.watch(['./src/**/*.tag', './src/main.js'], ['rollup']);
  gulp.watch(['bower.json' , './src/index.html'] , ['wiredep']);
});

gulp.task('default', ['watch', 'serve', 'wiredep', 'rollup']);
