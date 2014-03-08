module.exports = function ( grunt ) {

	'use strict';

	grunt.registerTask( 'build', [
		'sass',
		'concat',
		'copy'
	]);

};
