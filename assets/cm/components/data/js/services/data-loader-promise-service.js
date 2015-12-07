/* global angular, $, google */
(function (angular, cms) {
  'use strict';

  /**
   * @module data-loader-promise-service
   */
  angular.module(cms.components.data.name)
  /**
   * DataLoaderPromise service
   * @class DataLoaderPromise
   * @constructor
   * @param {object} $http stock angular service
   */
  .factory(cms.components.data.services.DataLoaderPromise, [
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
         * @return {object}
         *
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
        getData: function(url, transformResp, doCache){
          var caching = doCache === undefined ? false : doCache;
          var promise = $http({
            method: 'GET',
            url: url,
            transformResponse: transformResp,
            cache: caching
          })
          .then(
            function(response){
              return response;
            },
            function(errResponse){
              return errResponse;
              //console.warn("getData error: %s", status);
            }
          );

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
         *
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
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
            deferred.resolve(angular.copy(cacheResult));
            return deferred.promise;
          }

          promise = $http({
            method: 'POST',
            url: url,
            data: object,
            transformResponse: transformResp
          })
          .then(
            function(response){
              DataLoaderCacheService.put(url, object, angular.copy(response));
              return response;
            },
            function(errResponse){
              return errResponse;
              //console.warn("getData error: %s", status);
            }
          ); // END promise

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
          .then(function(reponse){
              return reponse;
            },
            function(errReponse){
              //console.warn("getData error: %s", errReponse.status);
            }
          );

          return promise;
        }

      };
    }]);
}(angular, cms));

