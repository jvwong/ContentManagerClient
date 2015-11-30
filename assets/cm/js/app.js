/* global angular, document */
'use strict';
/**
 * Manual bootstrap
 */
(function(angular, cms) {
    angular.module(cms.modules.app.name, [
      'ui.router',
      //'routeStyles',
      'angular-loading-bar',
      'toastr',
      'ui.bootstrap'
    ]);

    bootstrapApplication();

    function bootstrapApplication() {
        angular.element(document).ready(function(){
            angular.bootstrap(document, [cms.modules.app.name]);
        });
    }
}(angular, cms));
