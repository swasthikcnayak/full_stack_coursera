"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  uglify = require("gulp-uglify"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cleanCss = require("gulp-clean-css"),
  flatmap = require("gulp-flatmap"),
  htmlmin = require("gulp-htmlmin");

gulp.task("sass", function () {
  return guilp
    .src("./styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./styles"));
});

gulp.task("usemin", function () {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap(function (stream, file) {
        return stream.pipe(
          usemin({
            css: [rev()],
            html: [
              function () {
                return htmlmin({ collapseWhitespace: true });
              },
            ],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), "concat"],
          })
        );
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./styles/*.scss", gulp.series("sass"));
});

gulp.task("browser-sync", function () {
  var files = [
    "./*.html",
    "./styles/*.css",
    "./scripts/*.js",
    "./img/*.{png,jpg,jpeg,gif}",
  ];

  browserSync.init(files, {
    server: {
      baseDir: "./",
    },
  });
});

gulp.task("clean", function () {
  return del(["dist"]);
});

gulp.task("copyfonts", function () {
  gulp
    .src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("imagemin", function () {
  return gulp
    .src("img/*.{png,jpg,gif}")
    .pipe(
      imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest("dist/img"));
});

gulp.task(
  "default",
  gulp.series("browser-sync", function () {
    gulp.start("sass:watch");
  })
);

gulp.task(
  "build",
  gulp.series("clean", function () {
    gulp.start("copyfonts", "imagemin", "usemin");
  })
);