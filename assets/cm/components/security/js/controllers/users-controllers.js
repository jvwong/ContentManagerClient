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


  //////////////////////////////
  //// Users > Detail > Edit  //
  //////////////////////////////
  .controller(cms.components.security.controllers.usersDetailEdit,
  [           '$scope', '$state', '$stateParams', 'user_fetched', 'Upload', 'SECURITY', cms.components.security.services.AuthenticationService,
    function ( $scope,   $state,   $stateParams,   user_fetched,   Upload, SECURITY,  AuthenticationService) {
      var self,
        userdata = {};
      self = this;

      if(user_fetched && user_fetched.hasOwnProperty('data'))
      {
        angular.copy(user_fetched.data, userdata);
      }

      self.formErrors = [];
      self.usersItemForm = {};

      self.key = $stateParams.itemId;
      self.item = userdata[$stateParams.itemId];

      // scoped variables
      $scope.user = userdata;

      // ngImgCrop
      self.result = '';
      self.file = null;

      self.setAvatar = function(croppedDataUrl)
      {
        // Convert 'Blob' to 'File'
        var blob = Upload.dataUrltoBlob(croppedDataUrl);
        blob.name = self.file.name;
        blob.lastModifiedDate = self.file.lastModifiedDate;
        blob.lastModified = self.file.lastModified;

        AuthenticationService
          .setAvatar(userdata.username, blob)
          .then(function(response){
            if(response.status === 200)
            {
              //console.log(response);
              $scope.$parent.user = AuthenticationService.getCurrentLoginUser();
            }
          });
      };

      self.onFileSelect = function(file, invalidFiles) {
        if(invalidFiles.length)
        {
          var error,
            errorParam;
          error = invalidFiles[0].$error;
          errorParam = invalidFiles[0].$errorParam;
          self.formErrors = ["Invalid file " + error + " type " + errorParam];
          return;
        }

        if(file)
        {
          self.file = file;
        }
      };

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

      self.update = function(update_value){
        var patch = {
          op    : 'replace',
          path  : '/' + self.key,
          value : update_value
        };

        AuthenticationService
          .update(userdata.username, [patch])
          .then(function(response){
            if(response.status === 200)
            {
              //Update the data
              $scope.$parent.user = AuthenticationService.getCurrentLoginUser();
            } else {
              self.formErrors = ['Update failed'];
            }
          });
      };

    }])
;

}(angular, cms));
