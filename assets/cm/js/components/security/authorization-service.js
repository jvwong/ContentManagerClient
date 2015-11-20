/* global angular */
'use strict';

/**
 * Authorization Service object
 * @class AuthorizationService
 */

angular.module('cmApp')
  .factory('AuthorizationService', [
    'SECURITY',
    'AuthenticationService',
    function(SECURITY,
             AuthenticationService){
      var authorize = function(loginRequired, requiredPermissions, permissionCheckType) {
        var
          // routes are authorised by default
          result = SECURITY.enums.authorised.authorised,
          user = AuthenticationService.getCurrentLoginUser(),
          loweredPermissions = [],
          hasPermission = true,
          permission,
          i;

        permissionCheckType
          = permissionCheckType || SECURITY.enums.permissionCheckType.atLeastOne;

        if (loginRequired === true && user === undefined) {
          result = SECURITY.enums.authorised.loginRequired;

        } else if ((loginRequired === true && user !== undefined) &&
          (requiredPermissions === undefined || requiredPermissions.length === 0)) {
          // Login is required but no specific permissions are specified.
          result = SECURITY.enums.authorised.authorised;

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
        } // END if

        return result;

      }; /* END authorize */

      return {
        authorize: authorize
      };

  }]);





