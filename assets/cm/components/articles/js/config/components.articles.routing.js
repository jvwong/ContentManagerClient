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
            templateUrl: ARTICLES.templateDir.articles + 'articles.html',
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
            templateUrl: ARTICLES.templateDir.articles + 'articles.list.html'
          })


          ///////////////////////
          // Articles > Detail //
          ///////////////////////
          .state(ARTICLES.routing.states.articlesDetail, {

            url: ARTICLES.routing.urls.articlesDetail,

            // If there is more than a single ui-view in the parent template, or you would
            // like to target a ui-view from even higher up the state tree, you can use the
            // views object to configure multiple views. Each view can get its own template,
            // controller, and resolve data.

            // View names can be relative or absolute. Relative view names do not use an '@'
            // symbol. They always refer to views within this state's parent template.
            // Absolute view names use a '@' symbol to distinguish the view and the state.
            // So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
            views: {

              // So this one is targeting the unnamed view within the parent state's template.
              '': {
                templateUrl: ARTICLES.templateDir.articles + 'articles.detail.html',
                controller: ['$scope', '$stateParams',
                  function (  $scope,   $stateParams ) {
                  }]
              },

              // This one is targeting the ui-view="hint" within the parent.
              // To get the unnamed root, choose 'id@'
              'hint': {
                template: 'This is articles.detail view'
              }

              //// This one is targeting the ui-view="menuTip" within the parent state's template.
              //'menuTip': {
              //  // templateProvider is the final method for supplying a template.
              //  // There is: template, templateUrl, and templateProvider.
              //  templateProvider: ['$stateParams',
              //    function (        $stateParams) {
              //      // This is just to demonstrate that $stateParams injection works for templateProvider.
              //      // $stateParams are the parameters for the new state we're transitioning to, even
              //      // though the global '$stateParams' has not been updated yet.
              //      return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
              //    }]
              //}
            }
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

        ;
      }]) /* END config */
  ;
}(angular, cms));
