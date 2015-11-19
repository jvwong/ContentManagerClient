/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [
    'SECURITY',
    '$location',
    'AuthenticationService',
    function(SECURITY,
             $location,
             AuthenticationService) {

      var self;
      self = this;

      self.test = "jvwong";

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
              self.user.username = response.data.username;

              //console.log('setting user.username');
              //console.log(typeof response.data);
              //console.log(self.user.username);

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
        self.user.username = undefined;
        $location.url(SECURITY.routes.login);
      };

      //self.init = function () {
      //  $http.get('/api/users/current').success(function (user) {
      //    if(user.username !== 'anonymousUser'){
      //      $scope.authenticated = true;
      //      $scope.username = user.username;
      //    }
      //  });
      //};

  }]);

