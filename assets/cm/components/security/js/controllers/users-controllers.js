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


  //////////////////////
  //// Users > Detail //
  //////////////////////
  .controller(cms.components.security.controllers.usersDetail,
  [           'toastr', '$scope', '$state', '$stateParams', 'SECURITY', cms.components.security.services.AuthenticationService, cms.components.security.services.AuthenticationStorageService,
    function ( toastr,   $scope,   $state,   $stateParams,   SECURITY,  AuthenticationService, AuthenticationStorageService) {
      var self
        ;

      self = this;

      // scoped variables
      $scope.user = AuthenticationStorageService.retrieve();

    }])


    //////////////////////////////
    //// Users > Detail > Edit  //
    //////////////////////////////
    .controller(cms.components.security.controllers.usersDetailEdit,
    [           '$scope', '$state', '$stateParams', 'Upload', 'SECURITY', cms.components.security.services.AuthenticationService, cms.components.security.services.AuthenticationStorageService,
      function ( $scope,   $state,   $stateParams,   Upload,   SECURITY,  AuthenticationService, AuthenticationStorageService) {
        var self,
          userdata = AuthenticationStorageService.retrieve();
        self = this;

        self.formErrors = [];
        self.usersItemForm = {};

        self.key = $stateParams.itemId;
        self.item = userdata[$stateParams.itemId];

        // ngImgCrop
        self.result = '';
        self.file = null;

        self.picFile = '';

        self.setAvatar = function(croppedDataUrl)
        {
          // Convert 'Blob' to 'File'
          var blob;
          blob = Upload.dataUrltoBlob(croppedDataUrl);
          blob.name = self.file.name;
          blob.lastModifiedDate = self.file.lastModifiedDate;
          blob.lastModified = self.file.lastModified;
          blob.originalFilename = self.file.name;

          AuthenticationService
            .setAvatar(userdata.username, blob)
            .then(function(response){
              if(response.status === 200)
              {
                // No guarantee to update s3 in time - set directly
                $scope.$parent.user = AuthenticationService.getCurrentLoginUser();
                $scope.$parent.user.avatar = croppedDataUrl;

                //set it here for quick recovery - this may be bad for memory
                AuthenticationStorageService.store($scope.$parent.user);
                $state.go(SECURITY.routing.states.usersDetail);
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

    ///////////////////////
    //// Users > Account //
    ///////////////////////
    .controller(cms.components.security.controllers.usersAccount,
    [           'toastr', '$scope', '$state', '$stateParams', 'SECURITY', cms.components.security.services.AuthenticationService,
      function ( toastr,   $scope,   $state,   $stateParams,   SECURITY,  AuthenticationService) {
        var self
          ;

        self = this;

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
;

}(angular, cms));
