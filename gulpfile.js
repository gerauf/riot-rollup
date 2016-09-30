var gulp = require('gulp')
var webserver = require('gulp-webserver')
var shell = require('gulp-shell')
var path = require('path')
var join = path.join


gulp.task('server', function(){
  gulp.src('./dest')
      .pipe(webserver({
        livereload: true,
        open: true
      }))
})

gulp.task('rollup', shell.task([
  'rollup -c'
]))

gulp.task('watch', function(){
  gulp.watch(['./src/**/*.tag', './src/main.js'], ['rollup'])
})

gulp.task('default', ['watch', 'server', 'rollup'])
