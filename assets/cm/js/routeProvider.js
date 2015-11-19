/* global angular */
'use strict';

/**
 * Configuration for the $routeProvider service
 */

angular.module('cmApp')
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      //controller: 'cmAuthCtrl',
      //controllerAs: 'authCtrl',
      title: 'Login',
      templateUrl: 'cm/templates/auth/login.html',
      css: [
        'cm/styles/auth.css'
      ],
      access: {
        requiresLogin: false
      }
    })
    .when('/register', {
      title: 'Register',
      templateUrl: 'cm/templates/auth/register.html',
      css: [
        'cm/styles/auth.css'
      ],
      access: {
        requiresLogin: false
      }
    })
    .when('/', {
      title: 'Home',
      templateUrl: 'cm/templates/app/home.html',
      css: [
        'cm/styles/app.css'
      ],
      access: {
        requiresLogin: true
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
