/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)

  ////////////
  // Users  //
  ////////////
  .controller(cms.components.security.controllers.users,
    [            '$scope', '$stateParams',
      function (  $scope,   $stateParams ) {
      }])


    ////////////////////
    // Users > Detail //
    ////////////////////
    .controller(cms.components.security.controllers.usersDetail,
    [         '$scope', '$state', '$stateParams', 'user_fetched', 'toastr', 'SECURITY', cms.components.security.services.AuthenticationService,
      function($scope,   $state,   $stateParams,   user_fetched,   toastr,   SECURITY, AuthenticationService ){

        var self;
        self = this;
        self.user = user_fetched;

        self.remove = function(username){
          AuthenticationService
            .remove(username)
            .then(function(response){
              if(response.status === 204)
              {
                toastr.info('Deletion successful', 'Info');
                $state.go(SECURITY.routing.states.authLogin);
              }
            });
        };
      }])


    //////////////////////////////
    //// Users > Detail > Edit  //
    //////////////////////////////
    .controller(cms.components.security.controllers.usersDetailEdit,
    [           '$scope', '$state', '$stateParams', 'user_fetched', 'SECURITY', cms.components.security.services.AuthenticationService,
      function ( $scope,   $state,   $stateParams,   user_fetched,   SECURITY,  AuthenticationService) {
        var self;
        self = this;
        self.formErrors = [];
        self.usersItemForm = {};

        self.user = user_fetched;
        self.key = $stateParams.itemId;
        self.item = self.user[$stateParams.itemId];

        self.update = function(update_value){
          var patch = {
            op    : 'replace',
            path  : '/' + self.key,
            value : update_value
          };

          AuthenticationService
            .update(self.user.username, [patch])
            .then(function(response){

              if(response.status === 200)
              {
                //Update the data
                self.user = response.data;
                $state.go(SECURITY.routing.states.usersDetailEdit,
                  $stateParams,
                  { reload: true });
              } else {
                self.formErrors = ['Update failed'];
              }
            });
        };

      }])
;

}(angular, cms));
