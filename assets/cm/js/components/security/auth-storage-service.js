/* global angular */
'use strict';

/**
 * The AuthStorage is just a wrapper service over localStorage
 * @constructor
 */
function AuthStorageService(authKey){

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
  .provider('AuthStorageService', function(){

    // default value
    var authKey = "user";

    /**
     * Set the authKey
     */
    this.setAuthKey = function(keyName){
      authKey = keyName;
    };

    // Return a TokenStorageService instance
    this.$get = [function() {
      return new AuthStorageService(authKey);
    }];
  })
;
