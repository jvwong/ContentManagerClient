/* global angular, sails */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.app.name)
    .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )

  .constant('CMS', {
    homeDir: "cm/",
    templateDir: {
      index: "cm/templates/"
    },
    routing: {
      states: {
        index : 'index',
        home  : 'index.home'
      },
      urls: {
        index : '',
        home  : '/'
      }
    }
  })

  .config([ '$stateProvider', '$urlRouterProvider', 'SECURITY', 'CMS',
    function($stateProvider,   $urlRouterProvider,   SECURITY,   CMS ) {

      // For any unmatched url
      $urlRouterProvider.otherwise(CMS.routing.urls.home);

      // Set up the states
      $stateProvider

        ///////////////
        //   Index   //
        ///////////////
        .state(CMS.routing.states.index, {

          // If abstract, state can only be activated via children.
          abstract: true,

          // Abstract state will prepend '/contacts' onto child urls
          url: CMS.routing.urls.index,
          templateUrl: CMS.templateDir.index + 'index.html',
          controller: ['$scope', '$stateParams',
            function (  $scope,   $stateParams ) {
            }],
          data: {
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
          resolve: {}
        })


        ////////////////////
        // Index > Home   //
        ////////////////////
        .state(CMS.routing.states.home, {

          url: CMS.routing.urls.home,
          templateProvider: ['$stateParams',
            function (        $stateParams) {
              return '<span>home</span>';
            }],
            controller: ['$scope', '$stateParams',
              function (  $scope,   $stateParams ) {
              }]
        })
    }])

  .config(['$httpProvider', function($httpProvider){
    var MIME_TYPE_JSON = 'application/json;charset=UTF-8';
    $httpProvider.defaults.headers.common['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Content-Type']= MIME_TYPE_JSON;
  }])

  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 100;
  }])
  ;

}(angular, cms));
