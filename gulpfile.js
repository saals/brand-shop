const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sourceMaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const del = require('del');

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

gulp.task('copy', function () {
  return gulp.src(['src/fonts/**', 'src/js/**'], { base: 'src' })
    .pipe(gulp.dest('build'));

});

gulp.task('clean', function () {
  return del('build');
});

gulp.task("serve", gulp.series('clean', 'copy', 'html', 'img', 'sass', function () {
  browserSync.init({
    server: "build"
  });
  gulp.watch("src/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("src/*.html", gulp.parallel("html"));

  gulp.watch("src/img/**/*.{png,jpg,svg}", gulp.parallel("img"));
  gulp.watch(["src/fonts/**/*.{woff2,woff}", "src/js/**/*.js"], gulp.parallel("copy"));
}));