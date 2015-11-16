/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmAuthCtrl', [function() {
    var self;
    self = this;

    //self.login = function () {
    //  var credentials = { username: self.username, password: self.password };
    //  $http.post('/api/login', credentials).success(function (result, status, headers) {
    //    $scope.authenticated = true;
    //    TokenStorage.store(headers('X-AUTH-TOKEN'));
    //  });
    //};

    //self.logout = function () {
    //  // Just clear the local storage
    //  TokenStorage.clear();
    //  $scope.authenticated = false;
    //};

    //self.init = function () {
    //  $http.get('/api/users/current').success(function (user) {
    //    if(user.username !== 'anonymousUser'){
    //      $scope.authenticated = true;
    //      $scope.username = user.username;
    //    }
    //  });
    //};

  }]);

