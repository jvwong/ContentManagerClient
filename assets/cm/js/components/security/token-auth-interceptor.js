/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
  .factory(cms.components.security.services.TokenAuthInterceptor, [
    '$q',
    cms.components.security.services.TokenStorageService,
    function($q,
             TokenStorageService) {

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
    $httpProvider
      .interceptors
      .push(cms.components.security.services.TokenAuthInterceptor);
  });
}(angular, cms));
