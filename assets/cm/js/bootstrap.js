/* global angular */
'use strict';
/**
 * Preload templates and cache them on the client
 **/
angular.module('cmApp')
  .run([
    '$rootScope',
    '$templateRequest',
    '$location',
    'SECURITY',
    'AuthorizationService',
    function (
      $rootScope,
      $templateRequest,
      $location,
      SECURITY,
      AuthorizationService) {

      /* pages */
      $templateRequest('../cm/templates/auth/login.html', true);
      $templateRequest('../cm/templates/auth/register.html', true);

      /* START */
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var authorised;

        if (next.access !== undefined) {
          authorised = AuthorizationService.authorize(
            next.access.requiresLogin,
            next.access.permissions,
            next.access.permissionCheckType);

          if (authorised === SECURITY.enums.authorised.loginRequired) {
            $location.path(SECURITY.routes.login);
          } else if (authorised === SECURITY.enums.authorised.notAuthorised) {
            $location.path(SECURITY.routes.notAuthorised).replace();
          }
        }
      });
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      });
    }])
;
