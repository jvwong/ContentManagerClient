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
        create,
        remove,
        update,
        page = 1, getPage, setPage,
        recent, getRecent, setRecent,
        articles, getArticles, setArticles,
        current, getCurrent, setCurrent,
        refresh
        ;

      /**
       * Setup post login or register
       * @param response the response object
       * @returns {*}
       */
      function onSuccess(response) {
        if(response && response.status){
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

        url = UrlService.apiUrl(ARTICLES.routing.urls.articles);
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
        var url,
          promise,
          doCache = false
        ;
        url = UrlService.apiUrl(ARTICLES.routing.urls.articles) + id + '/';
        promise = DataLoaderPromise
          .getData(url, utils.transformRes, doCache)
          .then(onSuccess, onFail);

        return promise;
      };

      /**
       * Create a new article
       * @param data object of data
       * @returns {*}
       */
      create = function(data){

        var url = UrlService.apiUrl(ARTICLES.routing.urls.articles);

        var promise = DataLoaderPromise
          .postData(url, data, utils.transformRes)
          .then(onSuccess, onFail);

        return promise;
      };

      /**
       * Delete an existing article
       * @returns {*}
       */
      remove = function(ID){

        var url, spec;
        url = UrlService.apiUrl(ARTICLES.routing.urls.articles) + ID + '/';
        spec = {
          method: 'DELETE',
          url: url
        };

        var promise = DataLoaderPromise
          .requestData(spec)
          .then(onSuccess, onFail);

        return promise;
      };


      /**
       * Update an existing article
       * @param ID the string UUID
       * @param data the array of json patch data
       * @returns {*}
       */
      update = function(ID, data){

        var url, spec;
        url = UrlService.apiUrl(ARTICLES.routing.urls.articles) + ID + '/';
        spec = {
          method: 'PATCH',
          url: url,
          data: data,
          transformResponse: utils.transformRes
        };

        var promise = DataLoaderPromise
          .requestData(spec)
          .then(onSuccess, onFail);

        return promise;
      };

      getRecent = function(){
        return recent;
      };

      setRecent= function(){
        var promise = findAll(1).then(function(response)
        {
          if(response.status === 200)
          {
            recent = response.data.content;
            return response
          }
        });
        return promise;
      };

      /**
       * Retrieve the local variable for articles data
       * @returns {*}
       */
      getArticles = function(){
        return articles;
      };

      /**
       * Ping the api for the articles list sorted by created
       * @returns {*}
       */
      setArticles = function(pageNumber){
        var promise = findAll(pageNumber).then(function(response)
        {
          if(response.status === 200)
          {
            articles = response.data;
            return response
          }
        });
        return promise;
      };

      getPage = function(){ return page; };
      setPage = function(pageNumber){ page = pageNumber; };

      /**
       * Retrieve the local variable for the most recent
       * modified
       * @returns {*}
       */
      getCurrent = function(){
        return current;
      };

      /**
       * Ping the api for the list sorted by lastModified
       * @param ID
       * @returns {*}
       */
      setCurrent = function(ID){
        var promise = findOne(ID).then(function(response)
        {
          if(response.status === 200)
          {
            current = response.data;
            return response
          }
        });
        return promise;
      };


      /**
       * Convenience method for setting the recent, articles list,
       * and current article stored locally
       * @param ID
       */
      refresh = function(ID){
        if(ID){
          setCurrent(ID);
        }
        setRecent();
        setArticles(getPage());
      };


      return {
        findAll     : findAll,
        findOne     : findOne,
        create      : create,
        remove      : remove,
        update      : update,
        getRecent   : getRecent,
        setRecent   : setRecent,
        getArticles : getArticles,
        setArticles : setArticles,
        getPage     : getPage,
        setPage     : setPage,
        getCurrent  : getCurrent,
        setCurrent  : setCurrent,
        refresh     : refresh
      };
    }
  ]);
}(angular, cms));
