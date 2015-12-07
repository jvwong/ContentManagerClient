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
        var self;
        self = this;
        $scope.letterLimit = 25;

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
    // Articles > Create //
    ///////////////////////
    .controller(cms.components.articles.controllers.articlesCreate,
    [         'ARTICLES', 'ArticleService', '$state', '$stateParams',
      function(ARTICLES,   ArticleService,   $state,   $stateParams){

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

          var data = {
            title       : title,
            description : description,
            keywords    : keywords
          };
          ArticleService
            .create(data)
            .then(function(response){

              //caution - data could be cached
              if(response.status === 201){

                angular.copy(response.data, self.data);

                //change the location
                $stateParams.articleId = self.data.id;
                $state.go(ARTICLES.routing.states.articlesDetail, $stateParams, { reload: true });

              } else {

                if(response.status === 409) {
                  self.formErrors = ['Article already exists'];
                } else {
                  self.formErrors = ['Could not create article'];
                }
                //go back to create form
                $state.go('.');
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


    //////////////////////////////
    // Articles > Detail > Edit //
    //////////////////////////////
    .controller(cms.components.articles.controllers.articlesDetailEdit,
    [           '$scope', '$state', '$stateParams', 'article_fetched', 'ARTICLES', 'toastr', cms.components.articles.services.ArticleService,
      function ( $scope,   $state,   $stateParams,   article_fetched,   ARTICLES,   toastr,  ArticleService) {
        var self;
        self = this;
        self.formErrors = ['Update failed'];
        self.articleItemForm = {};


        self.key = $stateParams.itemId;
        self.item = article_fetched.data[$stateParams.itemId];

        $scope.$parent.article = article_fetched.data;

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

        self.update = function(update_value){
          var patch = {
            op    : 'replace',
            path  : '/' + self.key,
            value : update_value
          };

          ArticleService
            .update(article_fetched.data.id, [patch])
            .then(function(response){
                if(response.status === 200)
                {
                  //Update the data
                  $scope.$parent.article = response.data;
                  //$state.go('^', $stateParams, { reload: true });
                }
              });
        };

      }])
;

}(angular, cms));
