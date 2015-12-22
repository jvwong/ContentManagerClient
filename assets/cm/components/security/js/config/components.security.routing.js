/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
    .config([ '$stateProvider', '$urlRouterProvider', 'SECURITY',
      function($stateProvider,   $urlRouterProvider,   SECURITY) {

        // For any unmatched url
        $urlRouterProvider.otherwise(SECURITY.routing.states.authLogin);

        // Set up the states
        $stateProvider

          //////////////
          //   Auth   //
          //////////////
          .state(SECURITY.routing.states.auth, {

            // If abstract, state can only be activated via children.
            abstract: true,

            // Abstract state will prepend '/contacts' onto child urls
            url: SECURITY.routing.urls.auth,

            controller: cms.components.security.controllers.auth,
            templateUrl: SECURITY.templateDir.auth + 'auth.html',
            data: {
              css: [
                SECURITY.homeDir + 'styles/security.css'
              ],
              access: {
                isNotLoggedIn: true,
                requiresLogin: false,
                permissions: [],
                permissionType: undefined
              }
            },
            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. These are inherited
            // in children. Returns promise
            resolve: {
            }
          })


          //////////////////
          // Auth > Login //
          //////////////////
          .state(SECURITY.routing.states.authLogin, {
            url: SECURITY.routing.urls.authLogin,
            views: {

              // So this one is targeting the unnamed view within the parent.
              '': {
                templateUrl: SECURITY.templateDir.auth + 'auth.login.html',
                controller: cms.components.security.controllers.auth
              },

              // This one is targeting the ui-view="hint" within the parent.
              // To get the unnamed root, choose 'id@'
              'header': {
                template: '<p class="auth-header-links">' +
                            '<a ui-sref="auth.register">Register</a>' +
                          '</p>' +
                          '<h3 class="">Log In</h3>'
              }
            }
          })


          /////////////////////
          // Auth > Register //
          /////////////////////
          .state(SECURITY.routing.states.authRegister, {
            url: SECURITY.routing.urls.authRegister,
            views: {

              // So this one is targeting the unnamed view within the parent.
              '': {
                templateUrl: SECURITY.templateDir.auth + 'auth.register.html',
                controller: cms.components.security.controllers.auth
              },

              // This one is targeting the ui-view="hint" within the parent.
              // To get the unnamed root, choose 'id@'
              'header': {
                template: '<p class="auth-header-links">' +
                            '<a ui-sref="auth.login">Login</a>' +
                          '</p>' +
                          '<h3 class="">Register</h3>'
              }
            }
          })


          ///////////
          // Users //
          ///////////
          .state(SECURITY.routing.states.users, {
            // If abstract, state can only be activated via children.
            abstract: true,

            // Abstract state will prepend '/users' onto child urls
            url: SECURITY.routing.urls.users,
            templateUrl: SECURITY.templateDir.users + 'users.html',
            controller: cms.components.security.controllers.users,
            data: {
              css: [
                SECURITY.homeDir + 'styles/security.css'
              ],
              access: {
                isNotLoggedIn: false,
                requiresLogin: true,
                permissions: ["ROLE_CMSUSER", "ROLE_ADMIN"],
                permissionType: SECURITY.enums.permissionCheckType.atLeastOne
              }
            }
            // Use `resolve` to resolve any asynchronous controller dependencies
            // *before* the controller is instantiated. These are inherited
            // in children. Returns promise
            , resolve: {
              user_fetched: [ cms.components.security.services.AuthenticationService,
                function(     AuthenticationService){
                  return AuthenticationService.getUser();
                }]
            }
          })


          ////////////////////
          // Users > Detail //
          ////////////////////
          .state(SECURITY.routing.states.usersDetail, {

            url: SECURITY.routing.urls.usersDetail,

            views: {

              // Unnamed parent ui-view
              '': {
                templateUrl: SECURITY.templateDir.users + 'users.detail.html',
                controller: cms.components.security.controllers.usersDetail,
                controllerAs: 'usersDetailCtrl'
              },
              // Named parent ui-view="status"
              'footer@index': {
                controller: ['$scope', 'user_fetched',
                  function (  $scope,   user_fetched ) {
                    $scope.user = user_fetched.data;
                  }],
                templateProvider: ['$stateParams',
                  function (        $stateParams) {
                    // This is just to demonstrate that $stateParams injection works for
                    // templateProvider. $stateParams are the parameters for the new
                    // state we're transitioning to, even though the global
                    // '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">' +
                      'Viewing - <span ng-bind="user.username"></span>' +
                      '</small>';
                  }]
              }
            },
            resolve: {}
          })


          ///////////////////////////
          // Users > Detail > Edit //
          ///////////////////////////
          .state(SECURITY.routing.states.usersDetailEdit, {

            url: SECURITY.routing.urls.usersDetailEdit,

            views: {

              // Unnamed parent ui-view
              '' : {
                templateUrl: SECURITY.templateDir.users + 'users.detail.edit.html',
                controller: cms.components.security.controllers.usersDetailEdit,
                controllerAs: 'editCtrl'
              },

              //Named parent ui-view="status" inside "articles"
              'footer@index': {
                controller: ['$scope', '$stateParams', 'user_fetched',
                  function (  $scope,   $stateParams,   user_fetched ) {
                    $scope.user = user_fetched.data;
                  }],
                template: '<hr>' +
                          '<small class="muted">' +
                            'Editing - <span ng-bind="user.username"></span>' +
                          '</small>'
              }
            }
          })

          /////////////////////
          // Users > Account //
          /////////////////////

          //TODO this isn't working - sidebar
          .state(SECURITY.routing.states.usersAccount, {

            url: SECURITY.routing.urls.usersAccount,

            views: {

              // Unnamed parent ui-view
              '': {
                templateUrl: SECURITY.templateDir.users + 'users.account.html',
                controller: cms.components.security.controllers.usersAccount,
                controllerAs: 'usersAccountCtrl'
              },
              // Named parent ui-view="status"
              'footer@index': {
                controller: ['$scope', 'user_fetched',
                  function (  $scope,   user_fetched ) {
                    $scope.user = user_fetched.data;
                  }],
                templateProvider: ['$stateParams',
                  function (        $stateParams) {
                    // This is just to demonstrate that $stateParams injection works for
                    // templateProvider. $stateParams are the parameters for the new
                    // state we're transitioning to, even though the global
                    // '$stateParams' has not been updated yet.
                    return '<hr><small class="muted">' +
                      'Account for - <span ng-bind="user.username"></span>' +
                      '</small>';
                  }]
              }
            },
            resolve: {}
          })

      }])
  ;
}(angular, cms));
