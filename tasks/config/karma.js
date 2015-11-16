/**
 * Test runner automation
 *
 * -------------------------------------------------------
 *
 * This grunt task is configured to run karma test configs
 *
 * For usage docs see:
 * 		https://github.com/karma-runner/grunt-karma
 */
module.exports = function(grunt) {

	grunt.config.set('karma', {
    unit: {
      configFile: 'test/angular/cm/unit/karma.conf.js',
      singleRun: true
    }
	});

  grunt.loadNpmTasks('grunt-karma');
};
