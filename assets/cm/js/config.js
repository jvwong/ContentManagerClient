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

  .config(['$httpProvider', function($httpProvider){
    var MIME_TYPE_JSON = 'application/json;charset=UTF-8';
    $httpProvider.defaults.headers.common['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Content-Type']= MIME_TYPE_JSON;
  }])
  ;

}(angular, cms));
