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

            controller: cms.components.articles.controllers.articles,
            templateUrl: ARTICLES.templateDir.articles + 'articles.html',
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
              }
            }
          })


          ///////////////////////
          // Articles > List   //
          ///////////////////////
          .state(ARTICLES.routing.states.articlesList, {

            url: ARTICLES.routing.urls.articlesList,

            views: {

              // Named parent ui-view="sidebar"
              'sidebar': {
                templateUrl: ARTICLES.templateDir.articles + 'articles.sidebar.html',
                controller: ['$scope', '$stateParams', 'article_list',
                  function (  $scope,   $stateParams,   article_list ) {
                    $scope.articles = article_list.data.content;
                  }]
              },

              // Unnamed parent ui-view
              '': {
                templateUrl: ARTICLES.templateDir.articles + 'articles.list.html',
                controller: ['$scope', '$stateParams',
                  function (  $scope,   $stateParams ) {
                  }]
              }
            },
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ]
            }
          })
        ;
      }]) /* END config */
  ;
}(angular, cms));
