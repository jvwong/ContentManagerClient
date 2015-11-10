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

    fetchData().then(bootstrapApplication);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);

        // var $http = initInjector.get("$http");
        // return $http.get("/user/me").then(
        //     function(response) {
        //         grApp.constant("user", response.data);
        //
        //     }, function(errorResponse) {
        //         // Handle error case
        //         grApp.constant("user", {
        //             createdAt: undefined,
        //             email: undefined,
        //             lastLoginAt: undefined,
        //             protocol: undefined,
        //             provider: undefined,
        //             termsAgreedAt: undefined,
        //             username: "anonymous"
        //         });
        // });

        var $q = initInjector.get("$q");
        return $q(function(resolve, reject) {
            setTimeout(function() {
                app.constant("user", {
                    "username": "jvwong"
                });
                resolve('Hello!');
            }, 1);
        });
    }

    function bootstrapApplication() {
        angular.element(document).ready(function(){
            angular.bootstrap(document, ["cmApp"]);
        });
    }
}());
