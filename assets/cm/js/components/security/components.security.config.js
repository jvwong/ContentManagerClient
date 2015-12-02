/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
  .constant('SECURITY', {
    enums: {
      authorised: {
        authorised: 0,
        loginRequired: 1,
        notAuthorised: 2,
        ignore: 3
      },
      permissionCheckType: {
        atLeastOne: 0,
        combinationRequired: 1
      }
    },
    events: {
      userLoggedIn: 'auth:user:loggedIn',
      userLoggedOut: 'auth:user:loggedOut'
    },
    controllers: {
      login: 'cmAuthCtrl'
    },
    services: {
      authentication: 'AuthenticationService',
      authorization: 'authorization'
    },
    routing: {
      states: {
        login: 'login',
        register: 'register',
        success: 'articles',
        notAuthorised: 'not-authorised'
      },
      urls: {
        login: '/login',
        register: '/register',
        authentication: '/auth',
        users: '/users'
      }
    },
    roles: {
      defaultValue: 'ROLE_CMSUSER'
    }
  })

  .config(['TokenStorageServiceProvider', function(TokenStorageServiceProvider){
    TokenStorageServiceProvider.setKey('cm-auth-token');
  }])

  .config(['AuthenticationStorageServiceProvider', function(AuthenticationStorageService){
    AuthenticationStorageService.setKey('cm-auth-user');
  }])

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
          templateUrl: 'cm/js/components/security/templates/login.html',
          data: {
            css: [
              'cm/styles/auth/auth.css'
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
          templateUrl: 'cm/js/components/security/templates/register.html',
          data: {
            css: [
              'cm/styles/auth/auth.css'
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
