const { src, dest, parallel, series} = require('gulp');
const imagemin = require('gulp-imagemin');

function buildHtml() {
    return src('src/*.html')
        .pipe(dest('build/'));
}

function buildAssets() {
    return src('src/assets/**')
        .pipe(dest('build/assets/'));
}

function buildImages() {
    return src('src/assets/img/**')
        .pipe(imagemin())
        .pipe(dest('build/assets/img/'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
}

exports.default = parallel(buildHtml, series(buildAssets, buildImages));