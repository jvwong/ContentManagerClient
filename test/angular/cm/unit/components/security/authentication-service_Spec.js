/**
 * authentication-service.js tests
 * @author jvwong
 * @created 18/11/15
 */

/* START TESTS */
describe('authentication-service', function () {

  var
    authenticationService,
    rootScope;

  beforeEach(module(cms.components.security.name));
  beforeEach(module('DataLoaderPromiseMock'));
  beforeEach(module('UrlServiceMock'));
  beforeEach(module('TokenStorageServiceMock'));
  beforeEach(module('AuthenticationStorageServiceMock'));

  describe('login, logout, getCurrentLoginUser', function(){

    beforeEach(inject(function(AuthenticationService,
                               $rootScope){
      authenticationService = AuthenticationService;
      rootScope = $rootScope;
    }));

    describe('login', function(){
      var fetched;

      beforeEach(function(){
        spyOn(authenticationService, 'login').and.callThrough();
        authenticationService
          .login("username", "password")
          .then(function(response){
            fetched = response;
          });
      });

      it('should have the correct server data for user', function(){
        expect(authenticationService.login)
          .toHaveBeenCalledWith("username", "password");
        rootScope.$apply();
        expect(fetched.data).toBeDefined();
        expect(fetched.data).toEqual('created');
      });

    }); /* END login */

    describe('logout', function(){
      var fetched;

      beforeEach(function(){
        spyOn(authenticationService, 'logout').and.callThrough();
        authenticationService
          .login("username", "password");
      });

      it('should call getCurrentLoginUser', function(){
        rootScope.$apply();
        fetched = authenticationService.getCurrentLoginUser();
        expect(fetched).toBeDefined();
        authenticationService.logout();
        fetched = authenticationService.getCurrentLoginUser();
        expect(fetched).not.toBeDefined();
      });
    }); /* END logout */

  }); /* END login, logout, getCurrentLoginUser */

  describe('register', function(){

    var fetched;

    beforeEach(inject(function(AuthenticationService,
                               $rootScope){
      authenticationService = AuthenticationService;
      rootScope = $rootScope;
    }));

    beforeEach(function(){
      spyOn(authenticationService, 'register').and.callThrough();
      authenticationService
        .register("username",
                  "password",
                  "fullName",
                  "email")
        .then(function(response){
          fetched = response;
        });
    });

    it('should have the correct server data for user', function(){
      expect(authenticationService.register)
        .toHaveBeenCalledWith(
        "username",
        "password",
        "fullName",
        "email");
      rootScope.$apply();
      expect(fetched).toBeDefined();
      expect(fetched.data).toBeDefined();
    });

  }); /* END register */


  describe('drop', function(){

    var fetched;

    beforeEach(inject(function(AuthenticationService,
                               $rootScope){
      authenticationService = AuthenticationService;
      rootScope = $rootScope;
    }));

    beforeEach(function(){
      spyOn(authenticationService, 'remove').and.callThrough();
      authenticationService
        .remove("username")
        .then(function(response){
          fetched = response;
        });
    });

    it('should have removed the server data for user', function(){
      expect(authenticationService.remove)
        .toHaveBeenCalledWith("username");
      rootScope.$apply();
      expect(fetched).toBeDefined();
      expect(fetched.data).toBeDefined();
    });

  }); /* END drop */


  describe('update', function(){

    var fetched;

    beforeEach(inject(function(AuthenticationService,
                               $rootScope){
      authenticationService = AuthenticationService;
      rootScope = $rootScope;
    }));

    beforeEach(function(){
      spyOn(authenticationService, 'update').and.callThrough();
      authenticationService
        .update("username", [{email: "updated@email.com"}])
        .then(function(response){
          fetched = response;
        });
    });

    it('should have removed the server data for user', function(){
      expect(authenticationService.update)
        .toHaveBeenCalledWith("username",[{email: "updated@email.com"}]);
      rootScope.$apply();
      expect(fetched).toBeDefined();
      expect(fetched.data).toBeDefined();
    });

  }); /* END drop */

}); /* END authentication-service */
