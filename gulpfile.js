const { src, dest, parallel, series} = require('gulp');
const imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive')


function buildHtml() {
    return src('src/*.html')
        .pipe(dest('build/'));
}

function buildAssets() {
    return src('src/assets/**')
        .pipe(dest('build/assets/'));
}
function resizeImages() {
    return src('src/assets/img/**')
      .pipe(
        responsive({
              '**/*.jpg': {
                quality: 50,
                compressionLevel: 7,
              },
              '**/*.png': {
                quality: 50,
                compressionLevel: 7,
              },
              'chryso_tsokkou_avatar.jpeg': {
                quality: 50,
                compressionLevel: 7,
              },
              'avatar/**': {
                quality: 50,
                compressionLevel: 7,
                width: 150
              },
              'bg/**': {
                quality: 50,
                compressionLevel: 7,
              },
              'discover/**': {
                quality: 50,
                compressionLevel: 7,
              },
              'icon/**': {
                quality: 50,
                compressionLevel: 7,
              },
              'logo/**': {
                quality: 50,
                compressionLevel: 7,
              },
              'screenshots/**': {
                quality: 50,
                compressionLevel: 7,
              },
        })
      )
    .pipe(dest('build/assets/img/'))
}
function buildImages() {
    return src('build/assets/img/**')
   
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 60}),
        imagemin.optipng({optimizationLevel: 2}),
    ]))
    .pipe(dest('build/assets/img/'))
        
}

exports.default = parallel(buildHtml, series(buildAssets, resizeImages, buildImages));
