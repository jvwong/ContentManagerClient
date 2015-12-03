/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
  .constant('SECURITY', {
    homeDir: "cm/components/security/",
    templateDir: {
      auth:  "cm/components/security/templates/"
    },
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
    routing: {
      states: {
        auth            : 'auth',
        authLogin       : 'auth.login',
        authRegister    : 'auth.register',
        success         : 'articles.list'
      },
      urls: {
        auth            : '/auth',
        authLogin       : '',
        authRegister    : '/register',
        authentication  : '/auth',
        users           : '/users'
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
