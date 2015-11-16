/* global angular, document */
'use strict';
/**
 * Manual bootstrap
 */
(function() {
    var app = angular.module('cmApp', [
      'ngRoute',
      'routeStyles',
      'angular-loading-bar',
      'toastr'
    ]);

    bootstrapApplication();

    //function fetchData() {
    //  var initInjector = angular.injector(["ng"]);
    //
    //  //try to fetch the user cookie right away
    //  var
    //    $q = initInjector.get("$q")
    //    ;
    //
    //  return $q(function(resolve, reject) {
    //
    //    setTimeout(function() {
    //      app.constant("user", {
    //        "username": "jvwong"
    //      });
    //      resolve('Hello!');
    //    }, 1);
    //  });
    //}

    function bootstrapApplication() {
        angular.element(document).ready(function(){
            angular.bootstrap(document, ["cmApp"]);
        });
    }
}());
