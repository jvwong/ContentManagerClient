/* global angular */
(function (angular, cms) {
  'use strict';

  /**
   * Authorization Service object
   * @class AuthorizationService
   */

  angular.module(cms.modules.app.name)
  .factory('AuthorizationService', [
    'SECURITY',
    'AuthenticationService',
    function(SECURITY,
             AuthenticationService){
      var authorize = function(loginRequired, requiredPermissions, permissionCheckType, notLoggedIn) {
        var
          // routes are authorised by default
          result = SECURITY.enums.authorised.authorised,
          user = AuthenticationService.getCurrentLoginUser(),
          loweredPermissions = [],
          hasPermission = true,
          permission,
          i;

        //console.log('AuthorizationService');
        //console.log(user);

        permissionCheckType
          = permissionCheckType || SECURITY.enums.permissionCheckType.atLeastOne;

        if (loginRequired === true){

          // no user
          if (user === null || user === undefined) {
            result = SECURITY.enums.authorised.loginRequired;

          // User exists
          } else if (typeof user === 'object') {

            // No specific permissions
            if (requiredPermissions === undefined || requiredPermissions.length === 0) {
              result = SECURITY.enums.authorised.authorised;

              // Specific permissions are specified.
            } else if (loginRequired === true && requiredPermissions.length > 0) {

              loweredPermissions = [];
              angular.forEach(user.permissions, function (permission) {
                loweredPermissions.push(permission.toLowerCase());
              });

              for (i = 0; i < requiredPermissions.length; i += 1) {
                permission = requiredPermissions[i].toLowerCase();

                if (permissionCheckType === SECURITY.enums.permissionCheckType.combinationRequired) {
                  hasPermission = hasPermission && loweredPermissions.indexOf(permission) > -1;
                  // if all the permissions are required and hasPermission is false there is no point carrying on
                  if (hasPermission === false) {
                    break;
                  }
                } else if (permissionCheckType === SECURITY.enums.permissionCheckType.atLeastOne) {
                  hasPermission = loweredPermissions.indexOf(permission) > -1;
                  // if we only need one of the permissions and we have it there is no point carrying on
                  if (hasPermission) {
                    break; // out of the loop
                  }
                }
              }

              result = hasPermission ?
                SECURITY.enums.authorised.authorised :
                SECURITY.enums.authorised.notAuthorised;

            } // ENDif

          } // ENDif user exists

        } else {

          // Check if this route prevents logged in users from accessing it
          // Typically this is a login or registration page
          if(notLoggedIn && (user !== undefined && user !== null)){
            result = SECURITY.enums.authorised.ignore;
          } else {
            result = SECURITY.enums.authorised.authorised;
          }
        }

        return result;

      }; /* END authorize */

      return {
        authorize: authorize
      };

  }]);
}(angular, cms));




