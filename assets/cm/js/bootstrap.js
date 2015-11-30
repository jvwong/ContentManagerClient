/* global angular */
'use strict';
/**
 * Preload templates and cache them on the client
 **/
angular.module('cmApp')
  .run([
    '$rootScope',
    '$templateRequest',
    '$state',
    'SECURITY',
    'CM',
    'AuthorizationService',
    'AuthenticationService',
    function (
      $rootScope,
      $templateRequest,
      $state,
      SECURITY,
      CM,
      AuthorizationService) {

      /* pages */
      $templateRequest('../cm/templates/auth/login.html', true);
      $templateRequest('../cm/templates/auth/register.html', true);

      /* START */
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var authorised;

        if (toState.access !== undefined)
        {
          authorised = AuthorizationService.authorize(
            toState.access.requiresLogin,
            toState.access.permissions,
            toState.access.permissionCheckType,
            toState.access.isNotLoggedIn);

          if (authorised === SECURITY.enums.authorised.loginRequired)
          {
            event.preventDefault();
            $state.go(SECURITY.states.login, {}, { location: 'replace' });
          }
          else if (authorised === SECURITY.enums.authorised.notAuthorised ||
            authorised === SECURITY.enums.authorised.ignore)
          {
            event.preventDefault();
            authorised = 0;

            if(fromState.name)
            {
              $state.go(fromState.name, {}, { location: 'replace' });
            }
            else
            {
              $state.go(CM.states.articles, {}, { location: 'replace' });
            }

          }
        }
      });
    }])
;
