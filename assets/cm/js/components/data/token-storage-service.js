/* global angular */
'use strict';

/**
 * The TokenStorage is just a wrapper service over localStorage
 * Putting the token in the localStorage protects it from being read
 * by script outside the origin of the script that saved it,
 * just like cookies. However because the token is not an actual
 * Cookie, no browser can be instructed add it to requests automatically.
 * This is essential as it completely prevents any form of CSRF attacks.
 * @constructor
 */
function TokenStorageService(tokenKey){

  /**
   * Store a token to localstorage
   * @param token the string token
   * @returns {boolean} true if stored and valid
   */
  this.store = function(tokenValue){
    if(tokenValue === undefined || typeof tokenValue !== "string") return false;
    localStorage.setItem(tokenKey, tokenValue);
    return true;
  };

  /**
   * Get a token from localstorage
   * @returns {boolean} the token from localstorage
   */
  this.retrieve = function(){
    var tokenValue = localStorage.getItem(tokenKey);
    return tokenValue;
  };

  /**
   * Clear the token from localstorage
   */
  this.clear = function(){
    localStorage.removeItem(tokenKey);
  };
}

angular.module('cmApp')
  .provider('TokenStorageService', function(){

    // default value
    var tokenKey = "auth-token";

    /**
     * Set the tokenKey
     */
    this.setTokenKey = function(keyName){
      tokenKey = keyName;
    };

    // Return a TokenStorageService instance
    this.$get = [function() {
      return new TokenStorageService(tokenKey);
    }];
  })
;
