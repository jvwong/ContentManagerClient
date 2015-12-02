/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)

  .controller(cms.components.articles.controllers.article, [
    '$timeout',
    function($timeout){
      var self
      ;
      self = this;
      self.radioModel = "";

      $timeout(function() {
        angular.element('#articles-list').triggerHandler('click');
        self.radioModel = "Left";
      }, 1);
    }]) /* END cmArticleCtrl */

  .controller(cms.components.articles.controllers.articleList, [
      '$scope',
      'ARTICLES',
      cms.components.articles.services.ArticleService,
    function($scope,
             ARTICLES,
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
            angular.copy(response.data, self.data);
          });
      };

      // Move this to resolve of stateProvider.js
      ArticleService
        .findAll(null)
        .then(function(response){

          angular.copy(response.data, self.data);
          self.totalItems = self.data[rest_map.totalItems];
          self.itemsPerPage = self.data[rest_map.itemsPerPage];
          self.currentPage = self.data[rest_map.currentPage] + 1;
        });
    }]) /* END cmArticleListCtrl */

    .controller(cms.components.articles.controllers.articleCreate, [
      'ARTICLES',
      cms.components.articles.services.ArticleService,
      '$state',
      '$stateParams',
      function(ARTICLES,
               ArticleService,
               $state,
               $stateParams){

        var self;
        self = this;
        self.data = {};
        self.createInputs = {
          title         : undefined,
          description   : undefined,
          keywords      : undefined
        };
        self.formErrors = [];

        self.createArticle = function(title, description, keywords){
          ArticleService
            .create(title, description, keywords)
            .then(function(response){

              //caution - data could be cached
              if(response.status === 201){

                angular.copy(response.data, self.data);

                //change the location
                $state.go(ARTICLES.routing.states.articlesList,
                  $stateParams, { reload: true });

              } else {

                if(response.status === 409) {
                  self.formErrors = ['Article already exists'];
                } else {
                  self.formErrors = ['Could not create article'];
                }
                //go back to create form
                $state.go(ARTICLES.routing.states.articlesCreate);
              }
            },
            function(errResponse){
              // something went wrong here
              //$state.go(SECURITY.states.register);
              self.formErrors = ['Article creation failed'];
              console.error('createArticle error');
            });

        }; /* END createArticle */
      }]) /* END cmArticleCreateCtrl */
;

}(angular, cms));