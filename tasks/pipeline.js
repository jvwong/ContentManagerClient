/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'cm/styles/**/*.css',
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/angular-toastr/dist/angular-toastr.css',
  'bower_components/angular-loading-bar/build/loading-bar.min.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
    'bower_components/jquery/dist/jquery.js'
  , 'bower_components/bootstrap/dist/js/bootstrap.js'
  , 'bower_components/angular/angular.js'
  , 'bower_components/angular-mocks/angular-mocks.js'
  , 'bower_components/angular-ui-router/release/angular-ui-router.js'
  , 'bower_components/angular-ui-router-styles/ui-router-styles.js'
  , 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
  , 'bower_components/angular-toastr/dist/angular-toastr.js'
  , 'bower_components/angular-loading-bar/build/loading-bar.min.js'
  , 'bower_components/ng-file-upload/ng-file-upload.min.js'

  , 'cm/js/cms.js'
  , 'cm/js/utils/utils.js'

  // data
  , 'cm/components/data/js/config/components.data.js'
  , 'cm/components/data/js/config/components.data.config.js'
  , 'cm/components/data/js/services/data-loader-cache-service.js'
  , 'cm/components/data/js/services/data-loader-promise-service.js'
  , 'cm/components/data/js/services/url-service.js'


  // security
  , 'cm/components/security/js/config/components.security.js'
  , 'cm/components/security/js/config/components.security.config.js'
  , 'cm/components/security/js/config/components.security.routing.js'
  , 'cm/components/security/js/services/authentication-storage-service.js'
  , 'cm/components/security/js/services/token-storage-service.js'
  , 'cm/components/security/js/services/token-auth-interceptor.js'
  , 'cm/components/security/js/services/authentication-service.js'
  , 'cm/components/security/js/services/authorization-service.js'
  , 'cm/components/security/js/controllers/auth-controller.js'
  , 'cm/components/security/js/config/components.security.bootstrap.js'

  //users
  , 'cm/components/security/js/controllers/users-controllers.js'


  // articles
  , 'cm/components/articles/js/config/components.articles.js'
  , 'cm/components/articles/js/config/components.articles.routing.js'
  , 'cm/components/articles/js/controllers/article-controllers.js'
  , 'cm/components/articles/js/services/article-service.js'
  , 'cm/components/articles/js/services/article-widget-directive.js'
  , 'cm/components/articles/js/config/components.articles.config.js'

  // Other
  , 'cm/js/app.js'
  , 'cm/js/config.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  //'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
