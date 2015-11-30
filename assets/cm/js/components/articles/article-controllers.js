/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.modules.app.name)

  .controller('cmArticleListCtrl', [
      'ARTICLES',
      'ArticleService',
    function(ARTICLES,
             ArticleService){

      var self,
        rest_map;


      self = this;
      rest_map = ARTICLES.pagination.bootstrap_rest_map;

      // This should expose Spring Data Pageable elements
      self.data = {};

      // pagination
      self.totalItems = 0;
      self.currentPage = 1;

      self.setPage = function (pageNo) {
        self.currentPage = pageNo;
      };

      self.pageChanged = function() {
        ArticleService
          .findAll(self.currentPage)
          .then(function(response){
            angular.copy(response.data, self.data)
          });
      };

      ArticleService
        .findAll()
        .then(function(response){

          angular.copy(response.data, self.data);
          self.totalItems = self.data[rest_map.totalItems];
          self.itemsPerPage = self.data[rest_map.itemsPerPage];
          self.currentPage = self.data[rest_map.currentPage] + 1;
        });

    }]); /* END cmArticleListCtrl */

}(angular, cms));
