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
    'AuthorizationService',
    function (
      $rootScope,
      $templateRequest,
      $location,
      AuthorizationService) {

      /* pages */
      $templateRequest('../cm/templates/auth/login.html', true);
      $templateRequest('../cm/templates/auth/register.html', true);

      /* START */
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        //console.info('current');console.info(current);
        //console.info('next');console.info(next);

        var authorised;

        if (next.access !== undefined) {
          //authorised = authorization.authorize(
          //  next.access.loginRequired,
          //  next.access.permissions,
          //  next.access.permissionCheckType);
          //
          //if (authorised === jcs.modules.auth.enums.authorised.loginRequired) {
          //  $location.path(jcs.modules.auth.routes.login);
          //} else if (authorised === jcs.modules.auth.enums.authorised.notAuthorised) {
          //  $location.path(jcs.modules.auth.routes.notAuthorised).replace();
          //}
        }
      });
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      });
    }])
;
