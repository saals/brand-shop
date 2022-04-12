const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sourceMaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("serve", gulp.series('html', 'img', 'sass', function () {
  browserSync.init({
    server: "build"
  });
  gulp.watch("src/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("src/*.html", gulp.parallel("html"));
}));