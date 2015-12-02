/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
  .constant('SECURITY', {
    homeDir: "cm/components/security/",
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
  ;
}(angular, cms));
