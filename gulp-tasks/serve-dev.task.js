const gulp = require('gulp'),
	browserSync = require('browser-sync'),
	paths = require('./app.paths');

gulp.task('serve-dev', () => {
	browserSync.init({
		server: './'
	});
	return gulp.watch([...paths.in.app.js, ...paths.in.app.css, "*.html"]).on('change', browserSync.reload);
})
