/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [
    '$scope',
    'SECURITY',
    '$location',
    'AuthenticationStorageService',
    'AuthenticationService',
    function($scope,
             SECURITY,
             $location,
             AuthenticationStorageService,
             AuthenticationService) {

      var self;
      self = this;

      self.user = AuthenticationStorageService.retrieve();
      self.authenticated = false;
      self.formErrors = [];

      /**
       * Defer to the authentication-service implementation to
       * retrieve the user information based on credentials
       *
       * Case I: status 200 OK
       * Case II: status not 200 OK
       * Case III: error
       *
       */
      self.login = function(username, password) {

        AuthenticationService
          .login(username, password)
          .then(function(response){
            if(response.status === 200){
              self.user = response.data;
              self.authenticated = true;

              //change the location
              $location.url(SECURITY.routes.success);
            } else {
              //go back to login
              self.formErrors = ['Login failed'];
              $location.url(SECURITY.routes.fail);
            }
          },
          function(errResponse){
            //go back to login
            $location.url(SECURITY.routes.fail);
            self.formErrors = ['Login failed'];
            console.error('AuthController login error');
          });

      }; /* END login */

      self.logout = function () {
        // Just clear the local storage
        AuthenticationService.logout();
        self.authenticated = false;
        self.user = undefined;
        $location.url(SECURITY.routes.login);
      };

      //watch for the StockSelectService update
      $scope.$watch(
        AuthenticationService.getCurrentLoginUser,
        function(newUser, oldUser){
          if(newUser){
            //console.log('new user!');
            //console.log(newUser);
            self.user = newUser;
          }
        },
        true
      );
  }]);

