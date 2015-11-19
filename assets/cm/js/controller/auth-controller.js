/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [
    '$location',
    'AuthenticationService',
    function($location,
             AuthenticationService) {

      var self;
      self = this;

      self.user = {
        username: undefined
      };

      self.authenticated = false;
      self.formErrors = [];

      /**
       * Defer to the authentication-service implementation to
       * retrieve the user information based on credentials
       *
       * Case I: status 200 OK
       *
       *
       * Case II: error response
       *
       */
      self.login = function(username, password) {
        AuthenticationService
          .login(username, password)
          .then(function(response){
            if(response.status === 200){
              self.user.username = response.data[0].username;
              self.authenticated = true;
              //change the location
              $location.url('/');
            } else {
              //go back to login
              $location.url('/login');
            }
          },
          function(errResponse){
            //go back to login
            $location.url('/login');
            console.error('AuthController login error');
          });
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

