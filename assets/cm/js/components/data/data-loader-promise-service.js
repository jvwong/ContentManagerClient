/* global angular, $, google */
'use strict';
/**
 * @module data-loader-promise-service
 */

module.exports = angular.module('cmApp')
/**
 * DataLoaderPromise service
 * @class DataLoaderPromise
 * @constructor
 * @param {object} $http stock angular service
 */
  .factory('DataLoaderPromise', [
    '$q',
    '$rootScope',
    '$http',
    'DataLoaderCacheService',
    function($q, $rootScope, $http, DataLoaderCacheService) {

      return {

        /**
         * Retrieves data via GET using $http
         * @method getData
         * @param {String} url relative url
         * @param {object} transformResp transform response function
         * @return {object} promise
         */
        getData: function(url, transformResp){
          var promise = $http({
            method: 'GET',
            url: url,
            transformResponse: transformResp,
            cache: true
          })
            .success(function(data, status, headers, config){
              return data;
            })
            .error(function(data, status, headers, config){
              //console.warn("getData error: %s", status);
            });

          return promise;
        },

        /**
         * Retrieves data via POST using $http
         * @method postData
         * @param {String} url relative url
         * @param {Object} object the data object
         * @param {Object} transformResp function that transforms server
         * response. Gets data and header object as parameters. Should return
         * as required
         * @return {object} promise
         */
        postData: function(url, object, transformResp){
          var
            promise,
            deferred,
            cacheResult;


          //hit the cache first
          cacheResult = DataLoaderCacheService.get(url, object);

          //remember to copy out the result before returning
          if(cacheResult){
            //console.log('cache hit: %s', url);
            deferred = $q.defer();
            deferred.resolve({
              data: angular.copy(cacheResult)
            });
            return deferred.promise;
          }

          promise = $http({
            method: 'POST',
            url: url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param(object),
            transformResponse: transformResp
          })
            .success(function(data, status, headers, config){
              DataLoaderCacheService.put(url, object, angular.copy(data));
              return data;
            })
            .error(function(data, status, headers, config){
              //console.warn("getData error: %s", status);
            });

          return promise;
        },

        /**
         * Retrieves data according to configuration spec
         * @method requestData
         * @param {object} $http spec
         * @return {object} promise
         */
        requestData: function(spec){
          var promise = $http(spec)

            .success(function(data, status, headers, config){
              return data;
            })
            .error(function(data, status, headers, config){
              //console.warn("getData error: %s", status);
            });

          return promise;
        }

      };
    }]);


