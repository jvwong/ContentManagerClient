/* global angular */
'use strict';

/**
 * The AuthenticationStorageService is just a wrapper service over localStorage
 * @constructor
 */
function AuthenticationStorageService(authKey){

  /**
   * Store a user object to localstorage
   * @param authValue an auth object
   * @returns {boolean} true if stored and valid
   */
  this.store = function(authValue){
    if(authValue === undefined || typeof authValue !== 'object') return false;
    localStorage.setItem(authKey, JSON.stringify(authValue));
    return true;
  };

  /**
   * Get an auth bject from localstorage
   * @returns {object} the JSON representation of the auth
   */
  this.retrieve = function(){
    var authValue = localStorage.getItem(authKey);
    return JSON.parse(authValue);
  };

  /**
   * Clear the auth object from localstorage
   */
  this.clear = function(){
    localStorage.removeItem(authKey);
  };

}

angular.module('cmApp')
  .provider('AuthenticationStorageService', function(){

    // default value
    var key = "user";

    /**
     * Set the authKey
     */
    this.setKey = function(keyName){
      key = keyName;
    };

    // Return a TokenStorageService instance
    this.$get = [function() {
      return new AuthenticationStorageService(key);
    }];
  })
;
