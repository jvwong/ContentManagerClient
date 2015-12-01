/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.services + 'ArticleServiceMocks', [])
    .factory(cms.components.articles.services.ArticleService, function() {
      return {

        findAll: function(pageNumber) {
          var deferred = $q.defer();
          deferred.resolve({status: 200, data: 'OK'});
          return deferred.promise;
        }, /* END findAll */

        findOne: function(id){
          var deferred = $q.defer();
          deferred.resolve({status: 200, data: 'OK'});
          return deferred.promise;
        },

        create: function(title, description, keywords){
          var deferred = $q.defer();
          deferred.resolve({status: 201, data: 'created'});
          return deferred.promise;
        }

      };
    });

}(angular, cms));
