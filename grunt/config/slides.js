module.exports = function ( grunt ) {

	'use strict';

	var markdown, html;

	// markdown = grunt.template.process( grunt.file.read( 'src/slides.md' ) );
	// html = require( 'marked' )( markdown );

	//return html;
	return grunt.file.read( 'src/slides.html' );
};
