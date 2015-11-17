/* global angular */
'use strict';

/**
 * Configuration for the $routeProvider service
 */

angular.module('cmApp')
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'cmAuthCtrl',
      controllerAs: 'authCtrl',
      title: 'Login',
      templateUrl: 'cm/templates/auth/login.html',
      css: [
        'cm/styles/auth.css'
      ]
    })
    .when('/register', {
      title: 'Register',
      templateUrl: 'cm/templates/auth/register.html',
      css: [
        'cm/styles/auth.css'
      ]
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
