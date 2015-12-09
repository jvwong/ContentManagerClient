/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.data = {
    name: 'cms-components-data',
    services: {
      DataLoaderCacheService  : 'DataLoaderCacheService',
      DataLoaderPromise       : 'DataLoaderPromise',
      UrlService              : 'UrlService'
    }
  };

  angular.module(cms.components.data.name,
    [
      'ngFileUpload'
    ]);
}(angular, cms));
