var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');
rename = require('gulp-rename');
cssmin = require('gulp-cssmin');

/* pathConfig*/
var entryPoint = './src/index.js',
    browserDir = './',
    sassWatchPath = './styles/**/*.scss',
    jsWatchPath = './src/**/*.js',
    htmlWatchPath = './**/*.html';
/**/

gulp.task('js', function () {
    return browserify(entryPoint, { debug: true, extensions: ['es6'] })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
    const config = {
        server: { baseDir: browserDir }
    };

    return browserSync(config);
});

gulp.task('sass', function () {
    return gulp.src(sassWatchPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/css-min'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js', reload]);
    gulp.watch(sassWatchPath, ['sass', reload]);
    gulp.watch(htmlWatchPath, reload);
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);

function reload() {
    return gulp.src('')
        .pipe(browserSync.reload({ stream: true }))
}