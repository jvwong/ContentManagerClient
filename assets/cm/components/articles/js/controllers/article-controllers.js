/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)

  //////////////////
  // Articles     //
  //////////////////
  .controller(cms.components.articles.controllers.articles,
    ['$scope', '$stateParams', 'recent_list', 'article_list',
      function (  $scope,   $stateParams,   recent_list,   article_list ) {
        $scope.articles = article_list.data.content;
        $scope.recent = recent_list.data.content;
      }])


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
    [         '$scope', '$state', '$stateParams', 'article_fetched', 'ARTICLES', 'toastr', cms.components.articles.services.ArticleService,
      function($scope,   $state,   $stateParams,   article_fetched,   ARTICLES,   toastr,  ArticleService  ){

        var self;
        self = this;
        self.article = article_fetched.data;

        self.remove = function(ID){
          ArticleService
            .remove(ID)
            .then(function(response){
              if(response.status === 204)
              {
                toastr.info('Deletion successful', 'Info');
                $state.go(ARTICLES.routing.states.articlesList,
                  $stateParams,
                  { reload: true });
              }
            });
        };
      }])


    //////////////////////////////
    // Articles > Detail > Edit //
    //////////////////////////////
    .controller(cms.components.articles.controllers.articlesDetailEdit,
    [           '$scope', '$state', '$stateParams', 'article_fetched', 'ARTICLES', cms.components.articles.services.ArticleService,
      function ( $scope,   $state,   $stateParams,   article_fetched,   ARTICLES,  ArticleService) {
        var self;
        self = this;
        self.formErrors = ['Update failed'];
        self.articleItemForm = {};

        self.article = article_fetched.data;
        self.key = $stateParams.itemId;
        self.item = self.article[$stateParams.itemId];

        self.update = function(update_value){
          var patch = {
            op    : 'replace',
            path  : '/' + self.key,
            value : update_value
          };

          ArticleService
            .update(self.article.id, [patch])
            .then(function(response){
              if(response.status === 200)
              {
                //Update the data
                self.article = response.data;

                $state.go(ARTICLES.routing.states.articlesDetailEdit,
                  $stateParams,
                  { reload: true });
              }
            });
        };
                //update.addProperty("op", update_operation);
        //update.addProperty("path", update_path);
        //update.addProperty("value", update_value);


      }])
;

}(angular, cms));
