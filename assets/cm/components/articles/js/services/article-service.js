(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
  .factory(cms.components.articles.services.ArticleService, [

    'DataLoaderPromise',
    'UrlService',
    'ARTICLES',

    function (DataLoaderPromise,
              UrlService,
              ARTICLES) {
      var
        findAll,
        findOne,
        create
        ;

      /**
       * Setup post login or register
       * @param response the response object
       * @returns {*}
       */
      function onSuccess(response) {
        if(response.status){
          return response;
        } else {
          return response;
        }
      } /* END onSuccess */

      /**
       * Setup post failed login or register
       * @param response the response object
       * @returns {*}
       */
      function onFail(response) {
        console.error('ArticleService Data load error');
        return response;
      } /* END onFail */

      /**
       * Get the list of articles for this user
       * @param pageNumber String for the the 1-indexed page number to return
       * @returns promise from the underlying DataLoaderPromise
       */
      findAll = function(pageNumber) {
        var url,
          doCache = false,
          page = pageNumber || "1";

        url = UrlService.apiUrl(ARTICLES.routing.states.articles);
        url = UrlService.encodeParams(url, {
          page: page
        });

        var promise = DataLoaderPromise
          .getData(url, utils.transformRes, doCache)
          .then(onSuccess, onFail);
        return promise;
      }; /* END findAll */


      /**
       * Get an articles  by id
       * @returns {*}
       */
      findOne = function(id){

        var url = UrlService.apiUrl(ARTICLES.routing.urls.articles) + id + '/';
        var promise = DataLoaderPromise
          .getData(url, utils.transformRes)
          .then(onSuccess, onFail);

        return promise;
      };

      /**
       * Create a new article
       * @returns {*}
       */
      create = function(title, description, keywords){

        var url = UrlService.apiUrl(ARTICLES.routing.urls.articles);

        var promise = DataLoaderPromise
          .postData(url, {
            title: title,
            description: description,
            keywords: keywords
          }, utils.transformRes)
          .then(onSuccess, onFail);

        return promise;
      };


      return {
        findAll : findAll,
        findOne : findOne,
        create  : create
      };
    }
  ]);
}(angular, cms));