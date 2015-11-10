// /* global angular */
'use strict';

angular.module('cmApp')
    .controller('cmMainCtrl', ['user', function(user) {
        var self;

        self = this;

        self.user = user;
    }]);
