/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      'SECURITY',
      'ARTICLES',

      function($stateProvider,
               $urlRouterProvider,
               SECURITY,
               ARTICLES) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.routing.states.login);

        // Set up the states
        $stateProvider
          .state(ARTICLES.routing.states.articles, {
            url: ARTICLES.routing.urls.articles,
            controller: 'cmArticleCtrl as articleCtrl',
            templateUrl: ARTICLES.homeDir + 'templates/articles.html',
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ]
            },
            access: {
              isNotLoggedIn: false,
              requiresLogin: true,
              permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
              permissionType: SECURITY.enums.permissionCheckType.atLeastOne
            }
          })
          .state(ARTICLES.routing.states.articlesList, {
            controller: 'cmArticleListCtrl as articleListCtrl',
            templateUrl: ARTICLES.homeDir + 'templates/article-list.html',
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ]
            },
            access: {
              isNotLoggedIn: false,
              requiresLogin: true,
              permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
              permissionType: SECURITY.enums.permissionCheckType.atLeastOne
            }
          })
          .state(ARTICLES.routing.states.articlesCreate, {
            controller: 'cmArticleCreateCtrl as articleCreateCtrl',
            templateUrl: ARTICLES.homeDir + 'templates/article-create.html',
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ]
            },
            access: {
              isNotLoggedIn: false,
              requiresLogin: true,
              permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
              permissionType: SECURITY.enums.permissionCheckType.atLeastOne
            }
          });
      }])

  ;
}(angular, cms));
