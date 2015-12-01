/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.data = {
    name: 'cms-components',
    services: {
      DataLoaderCacheService  : 'DataLoaderCacheService',
      DataLoaderPromise       : 'DataLoaderPromise'
    }
  };

  angular.module(cms.components.data.name, []);
}(angular, cms));
