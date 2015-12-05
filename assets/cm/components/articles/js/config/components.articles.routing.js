/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .config([ '$stateProvider', '$urlRouterProvider', 'SECURITY', 'ARTICLES',
      function($stateProvider,   $urlRouterProvider,   SECURITY,   ARTICLES) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.routing.states.authLogin);

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
            controller: ['$scope', '$stateParams', 'recent_list', 'article_list',
              function (  $scope,   $stateParams,   recent_list,   article_list ) {
                $scope.articles = article_list.data.content;
                $scope.recent = recent_list.data.content;
              }],
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


          ///////////////////////
          // Articles > Detail //
          ///////////////////////
          .state(ARTICLES.routing.states.articlesDetail, {

            url: ARTICLES.routing.urls.articlesDetail,

            views: {

              // Named parent ui-view="sidebar"
              'sidebar': {
                templateUrl: ARTICLES.templateDir.articles + 'articles-sidebar.html',
                controller: ['$scope', '$stateParams', 'recent_list', 'article_list',
                  function (  $scope,   $stateParams,   recent_list,   article_list ) {
                    $scope.articles = article_list.data.content;
                    $scope.recent = recent_list.data.content;
                  }]
              },

              // Unnamed parent ui-view
              '': {
                templateUrl: ARTICLES.templateDir.articles + 'articles.detail.html',
                controller: cms.components.articles.controllers.articlesDetail,
                controllerAs: 'articleDetailCtrl'
              },

              // Named parent ui-view="status"
              'status': {
                controller: cms.components.articles.controllers.articlesDetail,
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
              article_fetched: function($stateParams, ArticleService){
                return ArticleService.findOne($stateParams.articleId);
              }
            }
          })

        ;
      }]) /* END config */
  ;
}(angular, cms));
