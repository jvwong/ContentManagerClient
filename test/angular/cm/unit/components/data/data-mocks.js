/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module('DataLoaderCacheServiceMock', [])
    .factory(cms.components.data.services.DataLoaderCacheService, function() {
      return {
        get: function(key, params) {
          return null;
        },

        put: function(key, params, data) {
          return null;
        }
      };
    });

  angular.module('DataLoaderPromiseMock', [])
    .factory(cms.components.data.services.DataLoaderPromise, ['$q', function($q) {
      return {

        getData: function(url, transformResp, doCache){
          var deferred = $q.defer();
          deferred.resolve({status: 200, data: 'ok', headers: function(){}});
          return deferred.promise;
        },

        postData: function(url, object, transformResp){
          var deferred = $q.defer();
          deferred.resolve({status: 201, data: 'created', headers: function(){}});
          return deferred.promise;
        },

        requestData: function(spec){
          var deferred = $q.defer();
          deferred.resolve({status: 200, data: 'ok'});
          return deferred.promise;
        }

      };
    }]);

  angular.module('UrlServiceMock', [])
    .factory(cms.components.data.services.UrlService, [function() {
      return {
        apiUrl: function (path) {
          return 'http://127.0.0.1/services/rest/';
        },

        encodeParams: function (url, params) {
          return 'http://127.0.0.1/services/rest/?param=fake';
        }
      }
    }]);

}(angular, cms));
