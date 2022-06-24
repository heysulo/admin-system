let gulp = require('gulp');
let concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
let watch = require('gulp-watch');
let clean = require('gulp-clean');

function buildCss(){
    return gulp.src('./scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('../public/admin/css'));
}

function buildJs(){
    return gulp.src('./app/**/*.js')
        .pipe(concat('application.js'))
        .pipe(gulp.dest('../public/admin/js'));
}

function buildHtml(){
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('../public/admin/html'));
}

function cleanJs() {
    return gulp.src('../public/admin/js/*', {read: false})
        .pipe(clean({force: true}));
}

function cleanCss() {
    return gulp.src('../public/admin/css/*', {read: false})
        .pipe(clean({force: true}));
}

function cleanHtml() {
    return gulp.src('../public/admin/html/*', {read: false})
        .pipe(clean({force: true}));
}

gulp.task('build-css', buildCss);
gulp.task('build-js', buildJs);
gulp.task('build-html', buildHtml);

gulp.task('clean-js', cleanJs);
gulp.task('clean-css', cleanCss);
gulp.task('clean-html', cleanHtml);

gulp.task('clean',
    gulp.series(
        gulp.parallel(
            'clean-css',
            'clean-js',
            'clean-html'
        )
    )
);

gulp.task('build',
    gulp.series(
       gulp.parallel(
            'build-css',
            'build-js',
            'build-html'
        ),
    )
);

gulp.task('release', gulp.series('clean', 'build'));

gulp.task('watch',function () {
    watch(['./**'], {}, function () {
        buildCss();
        buildHtml();
        buildJs();
    })
});
