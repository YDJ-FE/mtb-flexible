/* eslint-disable */

var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

gulp.task("es6", function () {
  return gulp.src("src/*.es6")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(`lib/flexible/${pkg.version}`));
});

gulp.task('watch', function() {
  return gulp.watch('src/*.es6', ['es6']);
})

gulp.task('default', ['es6', 'watch']);
