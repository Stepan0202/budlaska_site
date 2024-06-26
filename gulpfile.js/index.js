'use strict'
const {src, dest, series, parallel, watch} = require('gulp');
const fileInclude = require('gulp-file-include');
const gulpSass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');


function minifyImages(){
    return src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img/'))
}

function minifyJS(){
    return src('./src/js/**/*.js')
    .pipe(concat("main.js"))
    .pipe(minify())
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(dest('./dist/js/'))
}
function htmlInclude(){
    return src('./src/*.html')
    .pipe(fileInclude())
    .pipe(dest('./dist/'));
}

function scssCompiler(){
    return src('./src/scss/*.scss')
    .pipe(gulpSass())
    .pipe(dest('./dist/css/'))
}
function browserSyn(){
    browserSync.init({
        server: { 
            baseDir: "./dist/"
        }
    });
}

function browserReload(cb){
    browserSync.reload();
    cb();
}

function watchTask(){
    watch('/src/img/**/*', series(minifyImages, browserReload)),
    watch('./src/**/*.html', series(htmlInclude, browserReload)),
    watch('./src/**/*.scss', series(scssCompiler, browserReload))
    watch('./src/js/**/*.js', series(minifyJS, browserReload));
    watch('./src/fonts/**/*.{ttf,woff,eof,svg}', series(copyFonts, browserReload))
}
function copyFonts() {
    gulp.src('/src/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(dest('./dist/fonts/'));
 };
  exports.default = series(
    minifyImages,
    htmlInclude,
    scssCompiler,
    minifyJS,
    parallel(browserSyn, watchTask)
)
    
  exports.fileInclude = htmlInclude;
  exports.scssCompiler = scssCompiler;
  exports.browserSync = browserSyn;
  exports.watchTask = watchTask;
  exports.copyFonts = copyFonts;