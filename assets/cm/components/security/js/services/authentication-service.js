/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)
    .factory(cms.components.security.services.AuthenticationService, [
      'SECURITY',
      cms.components.data.services.DataLoaderPromise,
      cms.components.data.services.UrlService,
      cms.components.security.services.TokenStorageService,
      cms.components.security.services.AuthenticationStorageService,

    function (SECURITY,
              DataLoaderPromise,
              UrlService,
              TokenStorageService,
              AuthenticationStorageService) {
      var
        currentUser = undefined,
        login,
        logout,
        register,
        getCurrentLoginUser,
        remove,
        update,
        getUser,
        setAvatar
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
          id                : config.id,
          username          : config.username,
          email             : config.email,
          fullName          : config.fullName,
          createdDate       : config.createdDate,
          lastModifiedDate  : config.lastModifiedDate,
          avatar            : config.avatar,
          permissions       : roles
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
        url = UrlService.apiUrl(SECURITY.routing.urls.authentication);
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

      register = function(username, password, passwordConfirm, fullName, email){
        var
          spec,
          data = {},
          url = UrlService.apiUrl(SECURITY.routing.urls.users);

        data.username = username;
        data.password = password;
        data.passwordConfirm = passwordConfirm;
        data.fullName = fullName;
        data.email = email;

        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
        var promise = DataLoaderPromise
          .postData(url, data, utils.transformRes)
          .then(function(response){

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

      remove = function(username){
        var
          url = UrlService.apiUrl(SECURITY.routing.urls.users) + username + '/',
          spec = {
            method: 'DELETE',
            url: url
          }
          ;

        var promise = DataLoaderPromise
          .requestData(spec)
          .then(function(response){
            logout();
            return response;
          }, onFail);

        return promise;

      };

      /**
       * Update an existing user
       * @param username the string username
       * @param data the array of json patch data
       * @returns {*}
       */
      update = function(username, data){

        var url, spec;
        url = UrlService.apiUrl(SECURITY.routing.urls.users) + username + '/';
        spec = {
          method: 'PATCH',
          url: url,
          data: data,
          transformResponse: utils.transformRes
        };

        var promise = DataLoaderPromise
          .requestData(spec)
          .then(onSuccess, onFail);

        return promise;
      };

      getCurrentLoginUser = function (){
        return currentUser;
      };

      setAvatar = function(username, avatar){
        var
          spec,
          url = UrlService.apiUrl(SECURITY.routing.urls.users)
            .concat(username)
            .concat('/avatar/');

        var fd = new FormData();
        fd.append('avatar', avatar);

        //IMPORTANT!!! You might think this should be set to 'multipart/form-data'
        // but this is not true because when we are sending up files the request
        // needs to include a 'boundary' parameter which identifies the boundary
        // name between parts in this multi-part request and setting the Content-type
        // manually will not set this boundary parameter. For whatever reason,
        // setting the Content-type to 'false' will force the request to automatically
        // populate the headers properly including the boundary parameter.
        spec = {
          url : url,
          method: 'POST',
          data: fd,
          headers: {
            'Content-Type': undefined
          },
          transformResponse: utils.transformRes
        };
        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
        var promise = DataLoaderPromise
          .requestData(spec)
          .then(function onSuccess(response) {

            if(response.status === 202){
              //should update the user -- might not be ready on S3
              return getUser();
            } else {
              return response;
            }

          }, onFail);

        return promise;

      };

      /**
       * Get the current logged in user
       */
      getUser = function()
      {
        var
          url = UrlService.apiUrl(SECURITY.routing.urls.users)
            .concat('current/');
        /**
         * The response object has these properties:
         *  data – {string|Object} – The response body transformed with the transform functions.
         *  status – {number} – HTTP status code of the response.
         *  headers – {function([headerName])} – Header getter function.
         *  config – {Object} – The configuration object that was used to generate the request.
         *  statusText – {string} – HTTP status text of the response.
         */
        var promise = DataLoaderPromise
          .getData(url, utils.transformRes)
          .then(function onSuccess(response) {
            if(response.status === 200){
              currentUser = createUser(response.data);
              AuthenticationStorageService.store(currentUser);
              return response;
            } else {
              return response;
            }

          }, onFail);
        return promise;
      };

      initializeUser();

      return {
          login               : login
        , register            : register
        , logout              : logout
        , getCurrentLoginUser : getCurrentLoginUser
        , remove              : remove
        , update              : update
        , setAvatar           : setAvatar
        , getUser             : getUser
      };
    }
  ]);
}(angular, cms));
