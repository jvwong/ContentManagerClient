/* global angular */
(function (angular, cms) {
  'use strict';

  /**
   * Preload templates and cache them on the client
   **/
  angular.module(cms.components.security.name)
    .run([
      '$rootScope',
      '$templateRequest',
      '$state',
      'SECURITY',
      cms.components.security.services.AuthorizationService,

      function (
        $rootScope,
        $templateRequest,
        $state,
        SECURITY,
        AuthorizationService) {

        /* pages */
        $templateRequest('cm/js/components/security/templates/login.html', true);
        $templateRequest('cm/js/components/security/templates/register.html', true);

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
              $state.go(SECURITY.routing.states.login, {}, { location: 'replace' });
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
                $state.go(SECURITY.routing.states.success, {}, { location: 'replace' });
              }

            }
          }
        });
      }]);
}(angular, cms));
