/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.services.AuthenticationStorageService + 'Mock', [])
    .factory(cms.components.security.services.AuthenticationStorageService, function() {
      return {
        store: function (authValue) {
          return true;
        },

        retrieve: function () {
          return {};
        },

        clear: function () {
        }
      };
    });

  angular.module(cms.components.security.services.TokenStorageService + 'Mock', [])
    .factory(cms.components.security.services.TokenStorageService, function() {
      return {
        store: function (authValue) {
          return true;
        },

        retrieve: function () {
          return {};
        },

        clear: function () {
        }
      };
    });

  angular.module(cms.components.security.services.AuthenticationService + 'Mock', [])
    .factory(cms.components.security.services.AuthenticationService, [
      '$q',
      function($q) {
      return {
        login: function (username, password) {
          var deferred = $q.defer();
          deferred.resolve({status: 200, data: 'ok', headers: function(){}});
          return deferred.promise;
        },

        register: function(username, password, fullName, email){
          var deferred = $q.defer();
          deferred.resolve({status: 201, data: 'created', headers: function(){}});
          return deferred.promise;
        },

        logout: function (){
        },

        getCurrentLoginUser: function (){
          return {
            id: 23,
            username: "username",
            fullName: "fullName",
            createdDate: "createdDate",
            permissions: "roles"
          };
        }
      };
    }]);




}(angular, cms));
