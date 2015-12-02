/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .constant('ARTICLES', {
      pagination: {
        bootstrap_rest_map: {
          totalItems: "totalElements",
          itemsPerPage: "size",
          currentPage: "number"
        }
      },
      routing: {
        states: {
          articles: 'articles',
          articlesList: 'articles.list',
          articlesCreate: 'articles.create'
        },
        urls: {
          articles: '/articles'
        }
      }
    })

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
            templateUrl: 'cm/js/components/articles/templates/articles.html',
            data: {
              css: [
                'cm/styles/components/articles/articles.css'
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
            resolve: {
              initialData: function(){

                //var promise,
                //  data = {};
                //
                //promise = ArticleService
                //  .findAll()
                //  .then(function(response){
                //    angular.copy(response.data, data);
                //    return data;
                //  });
                //
                //return promise;
              }
            },
            controller: 'cmArticleListCtrl as articleListCtrl',
            templateUrl: 'cm/js/components/articles/templates/article-list.html',
            data: {
              css: [
                'cm/styles/components/articles/articles.css'
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
            templateUrl: 'cm/js/components/articles/templates/article-create.html',
            data: {
              css: [
                'cm/styles/components/articles/articles.css'
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
