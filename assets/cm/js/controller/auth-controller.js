/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [
    'DataLoaderPromise',
    'TokenStorageService',
    'UrlService',
    function(DataLoaderPromise, TokenStorageService, UrlService) {

      var self;
      self = this;

      self.username = null;
      self.password = null;
      self.data = [];
      self.authenticated = false;

      self.login = function () {
        var credentials = {
            username: self.username,
            password: self.password
          },

          path = 'auth/',
          url = UrlService.apiUrl(path);

        /**
         * loadData is a wrapper around the DataLoaderPromise
         * Needs the stockContext and selectedDate data
         */
          DataLoaderPromise.postData(url, credentials).then(
            function(response) {
              self.data = response.data;
              self.authenticated = true;
              //TokenStorageService.store(headers('X-AUTH-TOKEN'));
            },
            function(errResponse) {
              self.errorMessage = errResponse.data.msg;
            }
          );
      };

    //self.logout = function () {
    //  // Just clear the local storage
    //  TokenStorage.clear();
    //  $scope.authenticated = false;
    //};

    //self.init = function () {
    //  $http.get('/api/users/current').success(function (user) {
    //    if(user.username !== 'anonymousUser'){
    //      $scope.authenticated = true;
    //      $scope.username = user.username;
    //    }
    //  });
    //};

  }]);

