const { src, dest, parallel } = require('gulp');

function buildHtml() {
    return src('src/*.html')
        .pipe(dest('build/'));
}

function buildAssets() {
    return src('src/assets/**')
        .pipe(dest('build/assets/'));
}

exports.default = parallel(buildHtml, buildAssets);