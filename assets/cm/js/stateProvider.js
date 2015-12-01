/* global angular */
'use strict';

/**
 * Configuration for the $stateProvider for
 * angular-ui/ui-router
 */
(function (angular, cms) {
  'use strict';

  angular.module(cms.modules.app.name)
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      'SECURITY',
      'CM',

      function($stateProvider,
               $urlRouterProvider,
               SECURITY,
               CM) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.states.login);

        // Set up the states
        $stateProvider
          .state('login', {
            url: SECURITY.paths.login,
            templateUrl: 'cm/templates/auth/login.html',
            data: {
              css: [
                'cm/styles/auth/auth.css'
              ]
            },
            access: {
              isNotLoggedIn: true,
              requiresLogin: false,
              permissions: [],
              permissionType: undefined
            }
          })
          .state('register', {
            url: SECURITY.paths.register,
            templateUrl: 'cm/templates/auth/register.html',
            data: {
              css: [
                'cm/styles/auth/auth.css'
              ]
            },
            access: {
              isNotLoggedIn: true,
              requiresLogin: false,
              permissions: [],
              permissionType: undefined
            }
          })
          .state(CM.states.articles, {
            url: CM.paths.articles,
            controller: 'cmArticleCtrl as articleCtrl',
            templateUrl: 'cm/templates/components/articles/articles.html',
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
          .state(CM.states.articlesList, {
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
            templateUrl: 'cm/templates/components/articles/article-list.html',
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
          .state(CM.states.articlesCreate, {
            controller: 'cmArticleCreateCtrl as articleCreateCtrl',
            templateUrl: 'cm/templates/components/articles/article-create.html',
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
          ;

      }]);
}(angular, cms));
