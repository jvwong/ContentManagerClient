/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
      options: {
        paths: [], //@import statements
        compress: false
      },
      files: {
        ".tmp/public/cm/js/components/articles/styles/articles.css": "./assets/cm/js/components/articles/styles/articles.less",
        ".tmp/public/cm/js/components/security/styles/security.css": "./assets/cm/js/components/security/styles/security.less",
        ".tmp/public/cm/styles/base.css": "./assets/cm/styles/base.less",
        ".tmp/public/cm/styles/nav/nav.css": "./assets/cm/styles/nav/nav.less"
      }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
