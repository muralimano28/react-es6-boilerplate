"use strict";

var gulp = require("gulp"),
    connect = require("gulp-connect"), //Runs a local dev server
    open = require("gulp-open"), //Open a URL in a web browser
    browserify = require("browserify"), // Bundles JS
    babelify = require("babelify"), // Converts ES6 syntax to ES5
    reactify = require("reactify"),  // Transforms React JSX to JS
    source = require("vinyl-source-stream"), // Use conventional text streams with Gulp
    concat = require("gulp-concat"), //Concatenates files
    lint = require("gulp-eslint"), //Lint JS files, including JSX
    streamify = require("gulp-streamify"),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-clean-css"),
    gulpif = require("gulp-if");

var config = {
	port: 7000,
	devBaseUrl: "http://localhost",
	paths: {
		html: "./src/*.html",
		js: ["./src/**/*/*.js", "./src/**/*/*.jsx"],
		images: "./src/images/**/*.*",
		css: [
					"./src/styles/vendor/normalize.css",
					"./src/styles/default.css",
					"./src/styles/**/*.css"
    	],
		dist: "./dist",
		mainJs: "./src/main.js",
		assets: "./src/public/**/*"
	}
}

//Start a local development server
gulp.task("connect", function() {
	connect.server({
		root: ["dist"],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task("open", ["connect"], function() {
	gulp.src("dist/index.html")
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task("html", function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task("js", function() {
	browserify(config.paths.mainJs)
        .transform(babelify, {presets: ["es2015", "react"]})
		.bundle()
		.on("error", console.error.bind(console))
		.pipe(source("bundle.js"))
		.pipe(streamify(uglify({
			"compress": true,
			"preserveComments": false
		})))
		.on("error", console.error.bind(console))
		.pipe(gulp.dest(config.paths.dist + "/scripts"))
		.pipe(connect.reload());
});


gulp.task("css", function() {
	gulp.src(config.paths.css)
		.pipe(concat("bundle.css"))
		.pipe(streamify(minifyCss({
			"compatibility": "ie9"
		})))
		.pipe(gulp.dest(config.paths.dist + "/styles"))
        .pipe(connect.reload());
});

gulp.task("lint", function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: "eslint.config.json"}))
		.pipe(lint.format());
});

var cssCondition = function(file) {
	var fileName = file["history"].toString();
	if (fileName.indexOf(".css") > 0) {
		return true;
	}
	return false;
};

var jsCondition = function(file) {
	var fileName = file["history"].toString();
	if (fileName.indexOf(".js") > 0) {
		return true;
	}
	return false;
};

gulp.task("assets", function() {
	gulp.src(config.paths.assets)
		.pipe(gulpif(cssCondition, streamify(minifyCss({
						"compatibility": "ie9"
				}))))
		.pipe(gulpif(jsCondition, streamify(uglify({
            "compress": true,
            "preserveComments": false
        }))))
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task("watch", function() {
	gulp.watch(config.paths.html, ["html"]);
	gulp.watch(config.paths.js, ["js", "lint"]);
  	gulp.watch(config.paths.css, ["css"]);
	gulp.watch(config.paths.assets, ["assets"]);
});

gulp.task("default", ["html", "js", "css", "lint", "assets", "open", "watch"]);
