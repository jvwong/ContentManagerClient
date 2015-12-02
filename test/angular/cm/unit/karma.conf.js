module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../../../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    //ORDER MATTERS!
    files: [
        'assets/bower_components/jquery/dist/jquery.js'
      , 'assets/bower_components/angular/angular.js'
      , 'assets/bower_components/angular-mocks/angular-mocks.js'
      , 'assets/bower_components/angular-ui-router/release/angular-ui-router.js'
      , 'assets/bower_components/angular-ui-router-styles/ui-router-styles.js'
      , 'assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'

      , 'assets/cm/js/cms.js'
      , 'assets/cm/js/utils/utils.js'

      // data
      , 'assets/cm/components/data/js/config/components.data.js'
      , 'assets/cm/components/data/js/config/components.data.config.js'
      , 'assets/cm/components/data/js/services/data-loader-cache-service.js'
      , 'assets/cm/components/data/js/services/data-loader-promise-service.js'
      , 'assets/cm/components/data/js/services/url-service.js'

      // security
      , 'assets/cm/components/security/js/config/components.security.js'
      , 'assets/cm/components/security/js/config/components.security.config.js'
      , 'assets/cm/components/security/js/services/authentication-storage-service.js'
      , 'assets/cm/components/security/js/services/token-storage-service.js'
      , 'assets/cm/components/security/js/services/token-auth-interceptor.js'
      , 'assets/cm/components/security/js/services/authentication-service.js'
      , 'assets/cm/components/security/js/services/authorization-service.js'
      , 'assets/cm/components/security/js/controllers/auth-controller.js'

      // articles
      , 'assets/cm/components/articles/js/config/components.articles.js'
      , 'assets/cm/components/articles/js/controllers/article-controllers.js'
      , 'assets/cm/components/articles/js/services/article-service.js'
      , 'assets/cm/components/articles/js/services/article-widget-directive.js'
      , 'assets/cm/components/articles/js/config/components.articles.config.js'

      // Other
      , 'assets/cm/js/app.js'
      , 'assets/cm/js/config.js'

      //'test/**/*_Spec.js'
      // data
      , 'test/angular/cm/unit/components/data/data-mocks.js'
      , 'test/angular/cm/unit/components/data/data-loader-cache-service_Spec.js'
      , 'test/angular/cm/unit/components/data/data-loader-promise-service_Spec.js'
      , 'test/angular/cm/unit/components/data/url-service_Spec.js'

      // security
      , 'test/angular/cm/unit/components/security/security-mocks.js'
      , 'test/angular/cm/unit/components/security/auth-controller_Spec.js'
      , 'test/angular/cm/unit/components/security/authentication-service_Spec.js'
      , 'test/angular/cm/unit/components/security/authentication-storage-service_Spec.js'
      , 'test/angular/cm/unit/components/security/authorization-service_Spec.js'
      , 'test/angular/cm/unit/components/security/token-storage-service_Spec.js'

      // articles
      , 'test/angular/cm/unit/components/articles/article-mocks.js'
      , 'test/angular/cm/unit/components/articles/article-controllers_Spec.js'
      , 'test/angular/cm/unit/components/articles/article-service_Spec.js'
      , 'test/angular/cm/unit/components/articles/article-widget-directive_Spec.js'

    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8081,

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
