/* global angular */
'use strict';

/**
 * Configuration for the $routeProvider service
 */

angular.module('cmApp')
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      title: 'Login',
      templateUrl: 'cm/templates/auth/login.html',
      css: [
        'cm/styles/auth.css'
      ]
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
