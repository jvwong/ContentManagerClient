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
  'cm/styles/nav/nav.css',
  'cm/styles/base.css',
  'bower_components/bootstrap/dist/css/bootstrap.min.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
    'bower_components/jquery/dist/jquery.js'
  , 'bower_components/angular/angular.js'
  , 'bower_components/angular-mocks/angular-mocks.js'
  , 'bower_components/angular-ui-router/release/angular-ui-router.js'
  , 'bower_components/angular-ui-router-styles/ui-router-styles.js'
  , 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'

  , 'cm/js/cms.js'
  , 'cm/js/utils/utils.js'

  // data
  , 'cm/js/components/data/components.data.config.js'
  , 'cm/js/components/data/components.data.js'
  , 'cm/js/components/data/data-loader-cache-service.js'
  , 'cm/js/components/data/data-loader-promise-service.js'
  , 'cm/js/components/data/url-service.js'

  // security
  , 'cm/js/components/security/components.security.js'
  , 'cm/js/components/security/components.security.config.js'
  , 'cm/js/components/security/components.security.routing.js'
  , 'cm/js/components/security/authentication-storage-service.js'
  , 'cm/js/components/security/token-storage-service.js'
  , 'cm/js/components/security/token-auth-interceptor.js'
  , 'cm/js/components/security/authentication-service.js'
  , 'cm/js/components/security/authorization-service.js'
  , 'cm/js/components/security/auth-controller.js'
  , 'cm/js/components/security/components.security.bootstrap.js'

  // articles
  , 'cm/js/components/articles/components.articles.js'
  , 'cm/js/components/articles/components.articles.routing.js'
  , 'cm/js/components/articles/article-controllers.js'
  , 'cm/js/components/articles/article-service.js'
  , 'cm/js/components/articles/article-widget-directive.js'
  , 'cm/js/components/articles/components.articles.config.js'

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
