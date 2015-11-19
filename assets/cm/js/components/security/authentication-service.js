angular.module('cmApp')
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
      currentUser,
      createUser,
      login,
      logout,
      getCurrentLoginUser
    ;

    /**
     * Create a object with user properties, null otherwise
     * @param config
     * @returns {*}
     */
    function createUser(config) {

      if(!config){
        return null;
      }

      return {
        id: config.id,
        username: config.username,
        fullName: config.fullName,
        createdDate: config.createdDate,
        permissions: config.role
      };
    } /* END createUser */

    login = function (username, password) {
      var
      auth_url = UrlService.apiUrl(SECURITY.paths.authentication);
      /**
       * The response object has these properties:
       *  data – {string|Object} – The response body transformed with the transform functions.
       *  status – {number} – HTTP status code of the response.
       *  headers – {function([headerName])} – Header getter function.
       *  config – {Object} – The configuration object that was used to generate the request.
       *  statusText – {string} – HTTP status text of the response.
       */
      var promise = DataLoaderPromise
        .postData(auth_url, {
          username: username,
          password: password
        }, utils.transformRes)
        .then(
          // The server success callback
          function(response) {
            if(response.status === 200){
              TokenStorageService.store(response.headers('X-AUTH-TOKEN'));
              currentUser = createUser(response.data);
              AuthenticationStorageService.store(currentUser);
              return response;

            } else {
              return response;
            }
          },
          // error callback
          function(errResponse) {
            console.error('AuthenticationService Data load error');
            return errResponse;
          }
        );

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

    return {
        login   : login
      , logout  : logout
      , getCurrentLoginUser: getCurrentLoginUser
    };
  }
]);
