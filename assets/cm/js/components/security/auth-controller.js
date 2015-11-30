/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.modules.app.name)
  .controller('cmAuthCtrl', [
    '$scope',
    'SECURITY',
    'CM',
    '$state',
    'AuthenticationStorageService',
    'AuthenticationService',
    function($scope,
             SECURITY,
             CM,
             $state,
             AuthenticationStorageService,
             AuthenticationService) {

      var self;
      self = this;

      self.user = AuthenticationStorageService.retrieve();
      self.authenticated = false;
      self.loginForm = {
        username: undefined,
        password: undefined
      };
      self.registerInputs = {
        username  : undefined,
        password  : undefined,
        password2 : undefined,
        fullName  : undefined,
        email     : undefined,
        role      : undefined
      };
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
      self.login = function(username, password){
        AuthenticationService
          .login(username, password)
          .then(function(response){
            //caution - data could be cached
            if(response.status === 200){
              self.user = response.data;
              self.authenticated = true;

              //change the state
              $state.go(CM.states.articles);
            } else {
              //go back to login
              self.formErrors = ['Login failed'];
              $state.go(SECURITY.states.login);
            }
          },
          function(errResponse){
            //go back to login
            self.formErrors = ['Login failed'];
            console.error('AuthController login error');
          });

      }; /* END login */


      self.logout = function() {
        // Just clear the local storage
        AuthenticationService.logout();
        self.authenticated = false;
        self.user = undefined;
        $state.go(SECURITY.states.login);
      }; /* END logout */


      self.register = function(username, password, password2,
                               fullName, email){

        if(password !== password2){
          self.formErrors = ['Password mismatch'];
          return;
        }

        AuthenticationService
          .register(username, password, fullName, email)
          .then(function(response){

            //caution - data could be cached
            if(response.status === 200){
              self.user = response.data;
              self.authenticated = true;

              //change the location
              $state.go(CM.states.articles);

            } else {

              if(response.status === 409) {
                self.formErrors = ['User exists'];

              } else {
                self.formErrors = ['Registration failed'];
              }
              //go back to registration
              $state.go(SECURITY.states.articles);
            }
          },
          function(errResponse){
            //go back to login
            $state.go(SECURITY.states.register);
            self.formErrors = ['Registration failed'];
            console.error('AuthController login error');
          });

      }; /* END register */


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
}(angular, cms));
