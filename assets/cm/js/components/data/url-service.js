/* global angular */
(function (angular, cms) {
  'use strict';

  /**
   * The service for use in conjunction with the UrlServiceProvide
   * @class UrlService
   * @constructor
   * @param {object} opt_endpoint the optional url endpoint
   */
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
      if(typeof path !== 'string'){
        throw "invalid apiUrl parameter type";
      }

      //filter out forward slashes
      path_clean = path.trim().replace(/^\//g, '');
      endpoint_clean = endpoint.trim().replace(/^\/|\/$/g, '');

      //construct the url
      url = [endpoint_clean, path_clean].join('/');
      return url;
    };
  }

  angular.module(cms.modules.app.name)
  /**
   * Provider for the UrlService. The paths are appended to this prefix.
   * @class UrlServiceProvider
   * @constructor
   */
  .provider('UrlService', function() {

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
}(angular, cms));

