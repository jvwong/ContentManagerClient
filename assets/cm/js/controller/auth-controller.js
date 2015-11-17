/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [
    'DataLoaderPromise',
    'TokenStorageService',
    'UrlService',
    function(DataLoaderPromise,
             TokenStorageService,
             UrlService) {

      var self;
      self = this;

      self.username = null;
      self.password = null;
      self.data = [];
      self.authenticated = false;

      /**
       * Retrieve the user information based on credentials
       *
       * You could also decode the token itself and check the expiration time,
       * trusting the local client time to be accurate enough.
       */
      self.login = function() {
        var credentials = {
            username: self.username,
            password: self.password
          },

          auth_path = 'auth/',
          user_path = 'users/',

          auth_url = UrlService.apiUrl(auth_path),
          user_url = UrlService.apiUrl(user_path);

        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
          DataLoaderPromise.postData(auth_url, credentials).then(
            function(response) {
              console.log(response);
              if(response.status === 200){
                self.data = response.data;
                self.authenticated = true;
                TokenStorageService.store(response.headers('X-AUTH-TOKEN'));
              }
            },
            function(errResponse) {
              self.errorMessage = errResponse;
            }
          );
      }; /* END login */

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

