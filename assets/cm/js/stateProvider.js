/* global angular */
'use strict';

/**
 * Configuration for the $stateProvider for
 * angular-ui/ui-router
 */
(function (angular, cms) {
  'use strict';

  angular.module(cms.modules.app.name)
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      'SECURITY',
      'CM',

      function($stateProvider,
               $urlRouterProvider,
               SECURITY,
               CM) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.states.login);

        // Set up the states
        $stateProvider
          .state('login', {
            url: SECURITY.paths.login,
            templateUrl: 'cm/templates/auth/login.html'
          })
          .state('register', {
            url: SECURITY.paths.register,
            templateUrl: 'cm/templates/auth/register.html'
          })
          .state('articles', {
            url: CM.paths.articles,
            templateUrl: 'cm/templates/components/articles/article_list.html'
          })
          ;

      }]);
}(angular, cms));
