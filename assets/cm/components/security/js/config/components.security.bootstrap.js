/* global angular */
(function (angular, cms) {
  'use strict';

  /**
   * Preload templates and cache them on the client
   **/
  angular.module(cms.components.security.name)
    .run([
      '$rootScope',
      '$state',
      'SECURITY',
      cms.components.security.services.AuthorizationService,

      function (
        $rootScope,
        $state,
        SECURITY,
        AuthorizationService) {

        /* START */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          var authorised;

          if (toState.data.access !== undefined)
          {
            authorised = AuthorizationService.authorize(
              toState.data.access.requiresLogin,
              toState.data.access.permissions,
              toState.data.access.permissionCheckType,
              toState.data.access.isNotLoggedIn);

            if (authorised === SECURITY.enums.authorised.loginRequired)
            {
              event.preventDefault();
              $state.go(SECURITY.routing.states.authLogin, {}, { location: 'replace' });
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
