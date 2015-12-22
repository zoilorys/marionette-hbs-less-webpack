var  gulp = require('gulp'),
		
		webpack = require('webpack'),
		gulppack = require('gulp-webpack'),
		gls = require('gulp-live-server'),
		
		hbs = require('gulp-handlebars'),
		wrap = require('gulp-wrap'),
		declare = require('gulp-declare'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		
		less = require('gulp-less'),
		minifyCSS = require('gulp-minify-css'),
		prefixer = require('gulp-autoprefixer');

gulp.task('hbs', function() {
	gulp.src('src/hbs/*.hbs')
		.pipe(hbs({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Hub.templates',
			noRedeclare: true
		}))
		.pipe(uglify({
			mangle: true
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('less', function() {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(prefixer({
			browsers: ["last 2 versions"]
		}))
		.pipe(minifyCSS())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('webpack', function() {
	gulp.src('src/js/*.js')
		.pipe(gulppack( require('./webpack.config.js'), webpack))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
	var server = gls.static(['dist', '.']);
	server.start();
	gulp.watch('src/hbs/*.hbs', ['hbs']);
	gulp.watch('src/js/*.js', ['webpack']);
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch(['dist/css/*.css', 'dist/js/*.js'], function(file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('default', ['hbs', 'less', 'webpack', 'watch']);