var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber');


// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8084"
    });
});
// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    gulp.src('./sass/question-patch.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['scss'],
            errLogToConsole: true,
            style: 'expanded',
            sourceComments: 'normal'
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./styles'))
        .pipe(browserSync.reload({stream:true}));

});


// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync', 'sass'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
    // gulp.watch(["dev/*.html", "dev/js/**/*js"], ['bs-reload']);
});


// function