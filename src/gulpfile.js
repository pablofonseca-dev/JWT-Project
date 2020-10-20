'use strict';

const {watch} = require("gulp");
const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');

//Sass Compiler Setup, by default: node-sass, another option is Dart. 
sass.compiler = require('node-sass');

//Compile scss to css 
function compile_sass(){
    console.log("Compiling Sass...");
    //1. where are my sass files. 
    return gulp.src('./public/assets/styles/sass/**/*.scss')
    //2. pass that file through sass compiler. 
    .pipe(sass().on('error', sass.logError))
    //3. where do I save the compiled CSS? 
    .pipe(gulp.dest('./public/assets/styles/css'))
}

function watch_changes(){
    gulp.watch(['./public/assets/styles/sass/**/*.scss'], compile_sass);
}
//Say hello
function say_hello(){
    console.log("HELLO I´M GULP:)");
}

//Default
exports.default = gulp.series(say_hello, watch_changes);
//To run the specific command: gulp compile_sass
exports.compile_sass = compile_sass; 
exports.watch_changes = watch_changes; 
