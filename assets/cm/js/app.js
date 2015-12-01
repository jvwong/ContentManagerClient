/* global angular, document */
'use strict';
/**
 * Manual bootstrap
 */
(function(angular, cms) {
    angular.module(cms.components.app.name, [
      'ui.router',
      'uiRouterStyles',
      //'angular-loading-bar',
      //'toastr',
      'ui.bootstrap'
    ]);

    bootstrapApplication();

    function bootstrapApplication() {
        angular.element(document).ready(function(){
            angular.bootstrap(document, [cms.components.app.name]);
        });
    }
}(angular, cms));
