/* global angular */
(function (angular, cms) {
  angular.module(cms.components.app.name)
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
    states: {
      login: 'login',
      register: 'register',
      notAuthorised: 'not-authorised'
    },
    paths: {
      login: '/login',
      register: '/register',
      authentication: '/auth',
      users: '/users'
    },
    roles: {
      defaultValue: 'ROLE_CMSUSER'
    }
  });
}(angular, cms));
