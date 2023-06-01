"use strict";

const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const sass = require("gulp-dart-sass");

const clean = () => {
  return del(["dist"]);
};

const fonts = () => {
  return src("src/fonts//**/*.woff2").pipe(dest("dist/fonts"));
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const buildStyles = () => {
  return src("src/styles/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const stylesProd = () => {
  return src("src/styles/**/*.css")
    .pipe(concat("main.css"))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const html = () => {
  return src("src/**/*.html").pipe(dest("dist")).pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images"));
};

const scriptsDev = () => {
  return src(["src/js/**/*.js", "src/js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const scriptsProd = () => {
  return src(["src/js/**/*.js", "src/js/main.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(dest("dist"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

const images = () => {
  return src([
    "./src/images/**.jpg",
    "./src/images/**.png",
    "./src/images/**.jpeg",
    "./src/images/*.svg",
    "./src/images/**/*.jpg",
    "./src/images/**/*.png",
    "./src/images/**/*.jpeg",
  ])
    .pipe(imagemin())
    .pipe(dest("dist/images"));
};

watch("src/**/*.html", htmlMinify);
// watch("src/styles/**/*.css", stylesDev);
watch("src/images/svg/**/*.svg", svgSprites);
// watch("src/js/**/*.js", scriptsDev);
watch("src/resources/**", resources);
watch("src/styles/sass/**/*.scss", buildStyles);

exports.clean = clean;
exports.htmlMinify = htmlMinify;

// exports.stylesDev = stylesDev;
exports.scriptsDev = scriptsDev;
exports.resources = resources;

exports.stylesProd = stylesProd;
exports.scriptsProd = scriptsProd;

exports.svgSprites = svgSprites;
exports.imageMin = imagemin;
exports.watchFiles = watchFiles;

exports.build = series(clean, htmlMinify, stylesProd, scriptsProd, svgSprites);

exports.dev = series(
  clean,
  // resources,
  html,
  fonts,
  buildStyles,
  scriptsDev,
  images,
  // svgSprites,
  watchFiles
);
