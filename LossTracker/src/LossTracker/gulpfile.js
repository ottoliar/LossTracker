<<<<<<< HEAD
﻿var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('minify', function () {
    return gulp.src("wwwroot/js/**/*.js")
                .pipe(ngAnnotate())
                .pipe(uglify())
                .pipe(gulp.dest("wwwroot/lib/_app"));
=======
﻿/// <binding AfterBuild='minify' />

var gulp = require('gulp');
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");

gulp.task('minify', function () {
    return gulp.src(["wwwroot/js/**/*.js"])
               .pipe(ngAnnotate())
               .pipe(uglify())
               .pipe(gulp.dest("wwwroot/lib/_app"));
>>>>>>> 9f6f8a9c883039aa276720f1289d06efc0d998df
});