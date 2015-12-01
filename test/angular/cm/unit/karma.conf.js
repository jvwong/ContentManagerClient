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
      'assets/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'assets/bower_components/angular-ui-router-styles/ui-router-styles.js',
      'assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'

      , 'assets/cm/js/cms.js'
      , 'assets/cm/js/utils/utils.js'

      // data
      , 'assets/cm/js/components/data/**/*.js'

      , 'assets/cm/js/app.js'
      , 'assets/cm/js/config.js'


      // articles
      , 'assets/cm/js/components/articles/components.articles.js'
      , 'assets/cm/js/components/articles/components.articles.config.js'
      , 'assets/cm/js/components/articles/article-service.js'
      , 'assets/cm/js/components/articles/article-widget-directive.js'
      , 'assets/cm/js/components/articles/article-controllers.js'
      //'assets/cm/js/components/articles/**/*.js'


      // security
      //'assets/cm/js/components/security/*.js',


      //'test/**/*_Spec.js'
      // data
      , 'test/angular/cm/unit/components/data/data-mocks.js'
      //, 'test/angular/cm/unit/components/data/data-loader-cache-service_Spec.js'
      //, 'test/angular/cm/unit/components/data/data-loader-promise-service_Spec.js'
      //, 'test/angular/cm/unit/components/data/url-service_Spec.js'

      // security
      //, 'test/angular/cm/unit/components/security/auth-controller_Spec.js'
      //, 'test/angular/cm/unit/components/security/auth-controller_Spec.js'
      //, 'test/angular/cm/unit/components/security/authentication-service_Spec.js'
      //, 'test/angular/cm/unit/components/security/authentication-storage-service_Spec.js'
      //, 'test/angular/cm/unit/components/security/authorization-service_Spec.js'
      //, 'test/angular/cm/unit/components/security/token-storage-service_Spec.js'

      // articles
      , 'test/angular/cm/unit/components/articles/article-mocks.js'
      , 'test/angular/cm/unit/components/articles/article-controllers_Spec.js'
      , 'test/angular/cm/unit/components/articles/article-service_Spec.js'
      , 'test/angular/cm/unit/components/articles/article-widget-directive_Spec.js'



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
