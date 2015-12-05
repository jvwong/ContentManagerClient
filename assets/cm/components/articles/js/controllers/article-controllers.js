/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)

  /////////////////////
  // Articles > List //
  /////////////////////
  .controller(cms.components.articles.controllers.articlesList,
     [      '$scope', 'ARTICLES', 'article_list', 'recent_list', cms.components.articles.services.ArticleService,
    function($scope,   ARTICLES,   article_list,   recent_list,  ArticleService){

      var self,
        rest_map;

      self = this;
      rest_map = ARTICLES.pagination.bootstrap_rest_map;

      // This should expose Spring Data Pageable elements
      self.data = article_list.data || {};
      self.totalItems = self.data[rest_map.totalItems];
      self.itemsPerPage = self.data[rest_map.itemsPerPage];
      self.currentPage = self.data[rest_map.currentPage] + 1;

      //scoped variables
      $scope.articles = self.data.content;

      self.setPage = function (pageNo) {
        self.currentPage = pageNo;
      };

      self.pageChanged = function() {
        ArticleService
          .findAll(self.currentPage)
          .then(function(response){
            angular.copy(response.data, self.data);
            $scope.articles = self.data.content;
          });
      };
    }])


    ///////////////////////
    // Articles > Detail //
    ///////////////////////
    .controller(cms.components.articles.controllers.articlesDetail,
    [         '$scope', '$stateParams', 'article_fetched',
      function($scope,   $stateParams,   article_fetched   ){

        var self;
        self = this;
        self.article = article_fetched.data;
      }])
;

}(angular, cms));
