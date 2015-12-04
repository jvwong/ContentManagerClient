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
      }])
  ;
}(angular, cms));
