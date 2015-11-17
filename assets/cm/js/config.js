/* global angular, sails */
'use strict';

angular.module('cmApp')
  .config(['TokenStorageServiceProvider', function(TokenStorageServiceProvider){
    //Configuration here
  }])
  .config(['$httpProvider', function($httpProvider){
    // Set Configuration here
    var MIME_TYPE_JSON = 'application/json;charset=UTF-8';
    $httpProvider.defaults.headers.post['Accept']= MIME_TYPE_JSON;
    $httpProvider.defaults.headers.post['Content-Type']= MIME_TYPE_JSON;
  }])
;
