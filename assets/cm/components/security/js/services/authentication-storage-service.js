/* global angular, cms */
(function (angular, cms) {
  'use strict';

  /**
   * The AuthenticationStorageService is just a wrapper service over localStorage
   * @constructor
   */
  function AuthenticationStorageService(authKey) {

    /**
     * Store a user object to localstorage
     * @param authValue an auth object
     * @returns {boolean} true if stored and valid
     */
    this.store = function (authValue) {
      if (authValue === undefined || typeof authValue !== 'object') return false;
      localStorage.setItem(authKey, JSON.stringify(authValue));
      return true;
    };

    /**
     * Get an auth object from local storage
     * @returns {object} the JSON representation of the auth
     */
    this.retrieve = function () {
      var authValue = localStorage.getItem(authKey);
      return JSON.parse(authValue);
    };

    /**
     * Clear the auth object from localstorage
     */
    this.clear = function () {
      localStorage.removeItem(authKey);
    };

  }

  angular.module(cms.components.security.name)
  .provider(cms.components.security.services.AuthenticationStorageService, function () {
    // default value
    var key = "user";

    /**
     * Set the authKey
     */
    this.setKey = function (keyName) {
      key = keyName;
    };

    // Return a TokenStorageService instance
    this.$get = [function () {
      return new AuthenticationStorageService(key);
    }];
  });
}(angular, cms));
