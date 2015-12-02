/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .config([ '$stateProvider', '$urlRouterProvider', 'SECURITY', 'ARTICLES',
      function($stateProvider,   $urlRouterProvider,   SECURITY,   ARTICLES) {

        // For any unmatched url
        //$urlRouterProvider.otherwise(ARTICLES.routing.states.articles);

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
            templateUrl: ARTICLES.homeDir + 'templates/articles.html',
            data: {
              css: [
                ARTICLES.homeDir + 'styles/articles.css'
              ]
            },
            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. These are inherited
            // in children. Returns promise
            resolve: {
              article_list: function(ArticleService){
                return ArticleService.findAll(null);
              }
            },
            access: {
              isNotLoggedIn: false,
              requiresLogin: true,
              permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
              permissionType: SECURITY.enums.permissionCheckType.atLeastOne
            }
          })


          /////////////////////
          // Articles > List //
          /////////////////////
          .state(ARTICLES.routing.states.articlesList, {
            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/articles' (because '/articles' + '').
            url: ARTICLES.routing.urls.articlesList,

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            templateUrl: ARTICLES.homeDir + 'templates/article-list.html'
          })


      //    ///////////////////////
      //    // Articles > Create //
      //    ///////////////////////
      //    .state(ARTICLES.routing.states.articlesCreate, {
      //      url: ARTICLES.routing.urls.articlesCreate,
      //      controller: 'cmArticleCreateCtrl as articleCreateCtrl',
      //      templateUrl: ARTICLES.homeDir + 'templates/article-create.html',
      //      data: {
      //        css: [
      //          ARTICLES.homeDir + 'styles/articles.css'
      //        ]
      //      },
      //      access: {
      //        isNotLoggedIn: false,
      //        requiresLogin: true,
      //        permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
      //        permissionType: SECURITY.enums.permissionCheckType.atLeastOne
      //      }
      //    })
      //
      //    ///////////////////////
      //    // Articles > Detail //
      //    ///////////////////////
      //    .state(ARTICLES.routing.states.articlesDetail, {
      //      url: ARTICLES.routing.urls.articlesDetail,
      //      controller: 'cmArticleDetailCtrl as articleDetailCtrl',
      //      templateUrl: ARTICLES.homeDir + 'templates/article-detail.html',
      //      data: {
      //        css: [
      //          ARTICLES.homeDir + 'styles/articles.css'
      //        ]
      //      },
      //      access: {
      //        isNotLoggedIn: false,
      //        requiresLogin: true,
      //        permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
      //        permissionType: SECURITY.enums.permissionCheckType.atLeastOne
      //      }
      //    })
        ;
      }]) /* END config */
  ;
}(angular, cms));
