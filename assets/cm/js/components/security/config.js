/* global angular */
(function (angular, cms) {
  angular.module(cms.modules.app.name)
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
    routes: {
      login: '/login',
      register: '/register',
      success: '/',
      notAuthorised: '/not-authorised'
    },
    paths: {
      authentication: 'auth/',
      users: 'users/'
    },
    roles: {
      defaultValue: 'ROLE_CMSUSER'
    }
  });
}(angular, cms));
