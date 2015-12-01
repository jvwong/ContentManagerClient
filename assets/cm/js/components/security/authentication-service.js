/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.app.name)
    .factory('AuthenticationService', [
      'SECURITY',
      'DataLoaderPromise',
      'UrlService',
      'TokenStorageService',
      'AuthenticationStorageService',
      '$rootScope',

    function (SECURITY,
              DataLoaderPromise,
              UrlService,
              TokenStorageService,
              AuthenticationStorageService,
              $rootScope) {
      var
        currentUser = undefined,
        login,
        logout,
        register,
        getCurrentLoginUser
      ;

      /**
       * Create a object with user properties, null otherwise
       * @param config
       * @returns {*}
       */
      function createUser(config) {

        if(config === null || config === undefined){
          return null;
        }

        var roles = [];
        if(config.role && !Array.isArray(config.role)){
          roles = config.role.split(',');
        }

        return {
          id: config.id,
          username: config.username,
          fullName: config.fullName,
          createdDate: config.createdDate,
          permissions: roles
        };
      } /* END createUser */


      /**
       * Setup post login or register
       * @param response the response object
       * @returns {*}
       */
      function onSuccess(response) {
        //console.log(response);

        if(response.status === 200 || response.status === 201){
          TokenStorageService.store(response.headers('X-AUTH-TOKEN'));
          currentUser = createUser(response.data);
          AuthenticationStorageService.store(currentUser);
          return response;

        } else {
          return response;
        }

      } /* END onSuccess */

      /**
       * Setup post failed login or register
       * @param response the response object
       * @returns {*}
       */
      function onFail(response) {
        console.error('AuthenticationService Data load error');
        return response;
      } /* END onFail */

      /**
       * Initialize the currentUser from
       * @param config
       * @returns {*}
       */
      function initializeUser() {
        currentUser = AuthenticationStorageService.retrieve();
      } /* END initializeUser */

      login = function (username, password) {
        var
        url = UrlService.apiUrl(SECURITY.paths.authentication);
        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
        var promise = DataLoaderPromise
          .postData(url, {
            username: username,
            password: password
          }, utils.transformRes)
          .then(onSuccess, onFail);

        return promise;
      };

      register = function(username, password, fullName, email){
        var
          url = UrlService.apiUrl(SECURITY.paths.users),
          role = SECURITY.roles.defaultValue;
        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */

        var promise = DataLoaderPromise
          .postData(url, {
            username: username,
            password: password,
            fullName: fullName,
            email   : email,
            role    : role
          }, utils.transformRes)
          .then(function(response){
            //console.log(response);

            if(response.status !== 201){
              return response;

            } else {
              return login(username, password);
            }

          }, onFail);

        return promise;

      };

      logout = function (){
        // we should only remove the current user.
        // routing back to login login page is something we shouldn't
      //  // do here as we are mixing responsibilities if we do.
        currentUser = undefined;
        TokenStorageService.clear();
        AuthenticationStorageService.clear();
      };

      getCurrentLoginUser = function (){
        return currentUser;
      };

      initializeUser();

      return {
          login   : login
        , register: register
        , logout  : logout
        , getCurrentLoginUser: getCurrentLoginUser
      };
    }
  ]);
}(angular, cms));
