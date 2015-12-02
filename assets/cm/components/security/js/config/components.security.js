/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.security = {
    name: 'cms-components-security',
    services: {
      AuthenticationService         : 'AuthenticationService',
      AuthenticationStorageService  : 'AuthenticationStorageService',
      AuthorizationService          : 'AuthorizationService',
      TokenAuthInterceptor          : 'TokenAuthInterceptor',
      TokenStorageService           : 'TokenStorageService'
    },
    controllers: {
      auth: 'cmAuthCtrl'
    }
  };

  angular.module(cms.components.security.name, [
    'ui.router',
    'uiRouterStyles',
    cms.components.data.name
  ]);
}(angular, cms));
