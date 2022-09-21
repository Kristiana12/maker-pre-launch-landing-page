/* 
	https://www.youtube.com/watch?v=q0E1hbcj-NI
    Browsersync + Sass + Gulp in 15 minutes
    
	install as devDependencies:
	npm install browser-sync cssnano gulp gulp-cli gulp-postcss gulp-sass gulp-terser sass -D    
*/

// run gulp by typing on terminal : gulp
// error: gulp-sass no longer has a default Sass compiler; please set one yourself.

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// sass task
function sassTask() {
  return src('./sass/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('css', { sourcemaps: '.' }));
}

// javascript task
function jsTask() {
  return src('./js/**/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('./app', { sourcemaps: '.' }));
}

// browsersync
function browserSyncServer(callback) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
  });
  callback();
}

function browserSyncReload(callback) {
  browsersync.reload();
  callback();
}

// watch task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    ['./sass/**/*.scss', './js/**/*.js'],
    series(sassTask, jsTask, browserSyncReload)
  );
}

// gulp workflow
exports.default = series(sassTask, jsTask, browserSyncServer, watchTask);
