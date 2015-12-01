/* global angular, cms */
(function (angular, cms) {
  'use strict';

  /**
   * Thin wrapper around the $cacheFactory that accepts POST parameters
   * @class DataLoaderCacheService
   * @constructor
   */
  function DataLoaderCacheService(cache) {

    var local = cache;

    this.get = function(key, params) {
      var encoded = '',
        keyParams = key;

      if(angular.isObject(params)){
        encoded = $.param(params);
        keyParams += encoded;
      }
      return local.get(keyParams);
    };

    this.put = function(key, params, data) {
      var encoded = '',
        keyParams = key;

      if(angular.isObject(params)){
        encoded = $.param(params);
        keyParams += encoded;
      }
      local.put(keyParams, data);

      return keyParams;
    };
  }

  angular.module(cms.components.data.name)
  /**
   * Provider for the DataLoaderCacheService.
   * @class DataLoaderCacheServiceProvider
   * @constructor
   */
  .provider(cms.components.data.services.DataLoaderCacheService, function() {
    var cacheName = 'grCache';

    //config method
    this.setName = function(name) {
      cacheName= name;
    };

    // Return a rlService instance
    this.$get = ['$cacheFactory', function($cacheFactory) {
      var cache = $cacheFactory(cacheName);
      return new DataLoaderCacheService(cache);
    }];
  });
}(angular, cms));
