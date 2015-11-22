/* global angular */
'use strict';

/**
 * Configuration for the $routeProvider service
 */

angular.module('cmApp')
  .config([
    '$routeProvider',
    'SECURITY',
    function($routeProvider,
             SECURITY) {
  $routeProvider
    .when('/login', {
      title: 'Login',
      templateUrl: 'cm/templates/auth/login.html',
      css: [
        'cm/styles/auth/auth.css'
      ],
      access: {
        isNotLoggedIn: true,
        requiresLogin: false,
        permissions: [],
        permissionType: undefined
      }
    })
    .when('/register', {
      title: 'Register',
      templateUrl: 'cm/templates/auth/register.html',
      css: [
        'cm/styles/auth/auth.css'
      ],
      access: {
        isNotLoggedIn: true,
        requiresLogin: false,
        permissions: [],
        permissionType: undefined
      }
    })
    .when('/', {
      title: 'Home',
      templateUrl: 'cm/templates/app/home.html',
      css: [
        'cm/styles/app/app.css'
      ],
      access: {
        isNotLoggedIn: false,
        requiresLogin: true,
        permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
        permissionType: SECURITY.enums.permissionCheckType.atLeastOne
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
