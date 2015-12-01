/* global angular, sails */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.app.name)
  //.config(['TokenStorageServiceProvider', function(TokenStorageServiceProvider){
  //  TokenStorageServiceProvider.setKey('cm-auth-token');
  //}])
  //.config(['AuthenticationStorageServiceProvider', function(AuthenticationStorageService){
  //  AuthenticationStorageService.setKey('cm-auth-user');
  //}])
  .config(['$httpProvider', function($httpProvider){
    var MIME_TYPE_JSON = 'application/json;charset=UTF-8';
    $httpProvider.defaults.headers.common['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Content-Type']= MIME_TYPE_JSON;
  }])
  ;

}(angular, cms));
