/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
  .constant('SECURITY', {
    homeDir: "cm/components/security/",
    templateDir: {
      auth:  "cm/components/security/templates/auth/",
      users:  "cm/components/security/templates/users/"
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
        success         : 'index.articles.list',
        users           : 'index.users',
        usersDetail     : 'index.users.detail',
        usersDetailEdit : 'index.users.detail.edit',
        usersAccount    : 'index.users.detail.account'
      },
      urls: {
        auth            : '/auth',
        authLogin       : '',
        authRegister    : '/register',
        authentication  : '/auth',
        users           : '/users',
        usersDetail     : '/{username:[[a-z0-9_-]{5,20}}',
        usersDetailEdit : '/item/:itemId',
        usersAccount    : '/account'
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
