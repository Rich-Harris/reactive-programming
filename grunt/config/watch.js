module.exports = {
	all: {
		files: [ 'src/**/*', '!src/**/*.scss' ],
		tasks: [ 'build', 'copy' ]
	},
	sass: {
		files: [ 'src/**/*.scss' ],
		tasks: 'sass'
	}
};
