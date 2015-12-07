/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .config([ '$stateProvider', '$urlRouterProvider', 'SECURITY', 'ARTICLES',
      function($stateProvider,   $urlRouterProvider,   SECURITY,   ARTICLES) {

        // For any unmatched url
        $urlRouterProvider.otherwise(ARTICLES.routing.urls.articles);

        // Set up the states
        $stateProvider

          //////////////
          // Articles //
          //////////////
          .state(ARTICLES.routing.states.articles, {

            // If abstract, state can only be activated via children.
            abstract: true,

            // Abstract state will prepend '/contacts' onto child urls
            url: ARTICLES.routing.urls.articles,
            templateUrl: ARTICLES.templateDir.articles + 'articles.html',
            controller: cms.components.articles.controllers.articles,
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ],
              access: {
                isNotLoggedIn: false,
                requiresLogin: true,
                permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
                permissionType: SECURITY.enums.permissionCheckType.atLeastOne
              }
            },
            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. These are inherited
            // in children. Returns promise
            resolve: {
              article_list: function(ArticleService){
                return ArticleService.findAll(null);
              },
              recent_list: function(ArticleService){
                return ArticleService.findAll(1);
              }
            }
          })


          ///////////////////////
          // Articles > List   //
          ///////////////////////
          .state(ARTICLES.routing.states.articlesList, {

            url: ARTICLES.routing.urls.articlesList,
            templateUrl: ARTICLES.templateDir.articles + 'articles.list.html',
            controller: cms.components.articles.controllers.articlesList,
            controllerAs: 'articleListCtrl'
          })


          ////////////////////////
          // Articles > Create  //
          ////////////////////////
          .state(ARTICLES.routing.states.articlesCreate, {

            url: ARTICLES.routing.urls.articlesCreate,
            templateUrl: ARTICLES.templateDir.articles + 'articles.create.html',
            controller: cms.components.articles.controllers.articlesCreate,
            controllerAs: 'articleCreateCtrl'
          })


          ///////////////////////
          // Articles > Detail //
          ///////////////////////
          .state(ARTICLES.routing.states.articlesDetail, {

            url: ARTICLES.routing.urls.articlesDetail,

            views: {

              // Unnamed parent ui-view
              '': {
                templateUrl: ARTICLES.templateDir.articles + 'articles.detail.html',
                controller: cms.components.articles.controllers.articlesDetailEdit,
                controllerAs: 'articleDetailCtrl'
              },

              // Index ui-view="status"
              'footer@index': {
                controller: cms.components.articles.controllers.articlesDetailEdit,
                controllerAs: 'articleDetailCtrl',
                templateProvider: ['$stateParams',
                  function (        $stateParams) {
                    // This is just to demonstrate that $stateParams injection works for
                    // templateProvider. $stateParams are the parameters for the new
                    // state we're transitioning to, even though the global
                    // '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">' +
                                  'Viewing - <span ng-bind="articleDetailCtrl.article.title"></span>' +
                               '</small>';
                  }]
              }
            },
            // Get the indicated article by ID
            resolve: {
              article_fetched: [
                         '$stateParams', cms.components.articles.services.ArticleService,
                function( $stateParams,  ArticleService){
                return ArticleService.findOne($stateParams.articleId);
              }]
            }
          })


          //////////////////////////////
          // Articles > Detail > Edit //
          //////////////////////////////
          .state(ARTICLES.routing.states.articlesDetailEdit, {

            url: ARTICLES.routing.urls.articlesDetailEdit,

            views: {

              // Unnamed parent ui-view
              '' : {
                templateUrl: ARTICLES.templateDir.articles + 'articles.detail.edit.html',
                controller: cms.components.articles.controllers.articlesDetailEdit,
                controllerAs: 'editCtrl'
              },

              //Named parent ui-view="status" inside "articles"
              'footer@index': {
                controller: ['$scope', '$stateParams', 'article_fetched',
                  function (  $scope,   $stateParams,   article_fetched ) {
                    $scope.article = article_fetched.data;
                  }],
                template: '<hr><small class="muted">' +
                                'Editing - <span ng-bind="article.title"></span>' +
                              '</small>'
              }
            }
          })

        ;
      }]) /* END config */
  ;
}(angular, cms));
