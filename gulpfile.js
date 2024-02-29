//gulp watch

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("src/scss/**/*.scss", style);
  gulp
    .watch("src/*.html")
    .on("change", gulp.series(html))
    .on("change", browserSync.reload);
  gulp
    .watch("src/js/**/*.js")
    .on("change", gulp.series(js))
    .on("change", browserSync.reload);
}

function html() {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
}

function js() {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/assets/js"));
}

exports.style = style;
exports.watch = watch;
exports.html = html;
exports.js = js;
