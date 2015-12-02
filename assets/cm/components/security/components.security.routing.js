/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      'SECURITY',

      function($stateProvider,
               $urlRouterProvider,
               SECURITY) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.routing.states.login);

        // Set up the states
        $stateProvider
          .state('login', {
            url: SECURITY.routing.urls.login,
            templateUrl: SECURITY.homeDir + 'templates/login.html',
            data: {
              css: [
                SECURITY.homeDir + 'styles/security.css'
              ]
            },
            access: {
              isNotLoggedIn: true,
              requiresLogin: false,
              permissions: [],
              permissionType: undefined
            }
          })
          .state('register', {
            url: SECURITY.routing.urls.register,
            templateUrl: SECURITY.homeDir + 'templates/register.html',
            data: {
              css: [
                SECURITY.homeDir + 'styles/security.css'
              ]
            },
            access: {
              isNotLoggedIn: true,
              requiresLogin: false,
              permissions: [],
              permissionType: undefined
            }
          })
      }])
  ;
}(angular, cms));
