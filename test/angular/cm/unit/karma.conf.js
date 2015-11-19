module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        //ORDER MATTERS!
        files: [
            'assets/bower_components/jquery/dist/jquery.min.js',
            'assets/bower_components/angular/angular.min.js',
            'assets/bower_components/angular-mocks/angular-mocks.js',
            'assets/bower_components/angular-route/angular-route.min.js',
            'assets/bower_components/angular-route-styles/route-styles.js',
            'assets/bower_components/angular-loading-bar/build/loading-bar.min.js',
            'assets/bower_components/angular-toastr/dist/angular-toastr.min.js',
            'assets/cm/js/app.js',
            'assets/cm/js/config.js',

            'assets/cm/js/utils/utils.js',
            'assets/cm/js/controller/*.js',
            'assets/cm/js/components/data/**/*.js',
            'assets/cm/js/components/security/*.js',
            'test/**/*_Spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR ||
        //                  LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests
        // whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            //'PhantomJS'
             'Chrome'
            // ,'Firefox'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
