/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)

  //////////////
  // Articles //
  //////////////
  .controller(cms.components.articles.controllers.articles,
     [      '$scope', 'ARTICLES', 'article_list',
    function($scope,   ARTICLES,   article_list){

      var self,
        rest_map;

      self = this;
      rest_map = ARTICLES.pagination.bootstrap_rest_map;
      $scope.articles = article_list.data.content;

      //console.log(article_list);

      //// This should expose Spring Data Pageable elements
      //self.data = {};
      //
      //// pagination
      //self.totalItems = 0;
      //self.currentPage = 1;
      //
      //self.setPage = function (pageNo) {
      //  self.currentPage = pageNo;
      //};
      //
      //self.pageChanged = function() {
      //  //ArticleService
      //  //  .findAll(self.currentPage)
      //  //  .then(function(response){
      //  //    angular.copy(response.data, self.data);
      //  //  });
      //};
      //
      //self.totalItems = self.data[rest_map.totalItems];
      //self.itemsPerPage = self.data[rest_map.itemsPerPage];
      //self.currentPage = self.data[rest_map.currentPage] + 1;
    }])
;

}(angular, cms));
