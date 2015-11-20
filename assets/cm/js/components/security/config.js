
angular.module('cmApp')
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
      authentication: 'authentication',
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
  })
;
