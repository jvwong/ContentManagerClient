/* global angular, document */
'use strict';
/**
 * Manual bootstrap
 */
(function(angular, cms) {
    angular.module(cms.components.app.name, [
      'ui.router',
      'uiRouterStyles',
      cms.components.data.name,
      'ui.bootstrap'
    ]);

    bootstrapApplication();

    function bootstrapApplication() {
        angular.element(document).ready(function(){
            angular.bootstrap(document, [cms.components.app.name]);
        });
    }
}(angular, cms));
