'use strict';

var gulp = require( 'gulp' ),
	del = require( 'del' ),
	minifyCSS = require( 'gulp-minify-css' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' );


// CLEAN FILES FROM DIST DIRECTORY
// ===========================================================================================
gulp.task( 'clean', function ( cb ) {
	del([
		'dist/*'
	], cb );
});


// COPY ALL FILES FROM PUBLIC TO DIST
// ===========================================================================================
gulp.task( 'copy', [ 'clean' ], function() {

	return gulp.src( [ './preview.css', './weibo-preview.js', './**/*.png', './**/*.jpg', '!example/**/*' ] )
		.pipe( gulp.dest( './dist/' ) );

});

// MINIFY & MERGE CSS FILES
// ===========================================================================================
gulp.task( 'minify-css', [ 'copy' ], function() {

	return gulp.src( 'dist/*.css' )
		.pipe( minifyCSS({
			debug: true
		}) )
		.pipe( gulp.dest( 'dist/' ) );

});


// UGLIFY JS
// ===========================================================================================
gulp.task( 'uglify', [ 'copy' ], function() {

	gulp.src( 'dist/*.js' )
		.pipe( uglify() )
		.pipe( rename({
			extname: '.min.js'
		}) )
		.pipe( gulp.dest( 'dist/' ) );
});


// SIMPLE BUILD TASK
// $ gulp build
// ===========================================================================================
gulp.task( 'build', [ 'uglify', 'minify-css' ] );

