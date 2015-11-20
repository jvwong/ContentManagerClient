/* global angular */
'use strict';

angular.module('cmApp')
  .factory('TokenAuthInterceptor', [
    '$q',
    'TokenStorageService',
    function($q, TokenStorageService) {

      return {
        request: function(config) {
          var authToken = TokenStorageService.retrieve();
          if (authToken) {
            config.headers['X-AUTH-TOKEN'] = authToken;
          }
          return config;
        },
        responseError: function(error) {
          if (error.status === 401 || error.status === 403) {
            TokenStorageService.clear();
          }
          return $q.reject(error);
        }
      };
  }])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenAuthInterceptor');
  })
;