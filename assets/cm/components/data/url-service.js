/* global angular, cms */
(function (angular, cms) {
  'use strict';

  /**
   * The service for use in conjunction with the UrlServiceProvide
   * @class UrlService
   * @constructor
   * @param {object} opt_endpoint the optional url endpoint
   */
  angular.module(cms.components.data.name)
  /**
   * Provider for the UrlService. The paths are appended to this prefix.
   * @class UrlServiceProvider
   * @constructor
   */
  .provider(cms.components.data.services.UrlService, function() {

    var endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/';

    //config method
    this.setEndpoint = function(ep) {
      endpoint = ep;
    };

    // Return a rlService instance
    this.$get = [function() {
      return new UrlService(endpoint);
    }];
  });

  function UrlService(ep) {
    var endpoint;

    //Should validate this endpoint
    endpoint = ep;

    /**
     * Construct a url for the api
     * @method apiUrl
     * @param {string} path the url for the ajax GET
     */
    this.apiUrl = function(path) {
      var path_clean,
        endpoint_clean,
        url;

      //validate
      if(!path || typeof path !== 'string'){
        throw "invalid apiUrl parameter type";
      }

      //filter out forward slashes
      path_clean = path.trim().replace(/^\/|\/$/g, '');
      endpoint_clean = endpoint.trim().replace(/^\/|\/$/g, '');

      //construct the url
      url = [endpoint_clean, path_clean].join('/').concat('/');
      return url;
    };

    /**
     * Append parameters
     * @method param
     * @param {object} a map of key and values to encode
     */
    this.encodeParams = function(url, params) {
      var
        length,
        iteration;

      //validate
      if(!url || typeof url !== 'string'){
        throw "invalid url type";
      }
      if(!params || typeof params !== 'object'){
        throw "params must be an object hash";
      }

      length = Object.keys(params).length;
      iteration = 0;

      //construct the url
      angular.forEach(params, function(value, key){
        //add the ? char to the beginning only
        url += iteration ? "" : "?";
        url += key + "=" + value;
        url += iteration === length - 1 ? "": "&";
        iteration += 1;
      });

      return url;
    };
  }
}(angular, cms));

