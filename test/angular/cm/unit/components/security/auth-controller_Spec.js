/**
 * auth-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('auth-controller', function () {

  var
  authenticationService,
  security,
  state,
  scope,
  mockBackend,
  ctrl
  ;

  beforeEach(module(cms.components.security.name));
  beforeEach(module('AuthenticationStorageServiceMock'));
  beforeEach(module('AuthenticationServiceMock'));

  describe('login, logout, etc.', function(){

    describe('login', function(){

      describe('success', function(){

        beforeEach(inject(function($rootScope,
                                   SECURITY,
                                   $controller,
                                   $state,
                                   AuthenticationService){
          scope = $rootScope;
          ctrl = $controller(cms.components.security.controllers.auth, {$scope:scope });
          security = SECURITY;
          authenticationService = AuthenticationService;
          state = $state;
          spyOn(ctrl, 'login').and.callThrough();
          spyOn(state, 'go').and.stub();
        }));

        it('should call the login function and set url to "#/', function(){
          ctrl.login("username", "password");
          scope.$digest();
          expect(ctrl.login).toHaveBeenCalled();
          expect(state.go).toHaveBeenCalled();
        });

        it('should have set the user object and authentication state', function(){
          ctrl.login("username", "password");
          scope.$apply();
          expect(ctrl.user.username).toEqual('username');
          expect(ctrl.authenticated).toBeTruthy();
        });

      }); /* END success */

    }); /* END login */

    describe('logout', function(){

      var postData = {
        username: 'adminUser',
        password: 'asdasdasd'
      }
      ;

      beforeEach(inject(function($rootScope,
                                 SECURITY,
                                 $controller,
                                 $state,
                                 AuthenticationService){
        scope = $rootScope;
        ctrl = $controller(cms.components.security.controllers.auth, {$scope:scope });
        security = SECURITY;
        authenticationService = AuthenticationService;
        state = $state;

        spyOn(ctrl, 'logout').and.callThrough();
        spyOn(state, 'go').and.stub();
      }));

      it('should call the logout function and set url to "#/', function(){
        ctrl.logout();
        expect(ctrl.logout).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
      });

      it('should have set the user object and authentication state', function(){
        ctrl.logout();
        expect(ctrl.user).toBeUndefined();
        expect(ctrl.authenticated).toBeFalsy();
      });

    }); /* END logout */

  }); /* END login, logout etc... */

  describe('register', function(){

    var postData = {
      username: 'username24',
      password: 'password24',
      fullName: 'fullname24',
      email   : 'email24@email.com',
      role    : 'ROLE_CMSUSER'
    }
    ;

    describe('success', function(){

      beforeEach(inject(function($rootScope,
                                 SECURITY,
                                 $controller,
                                 $state,
                                 AuthenticationService){
        scope = $rootScope;
        ctrl = $controller(cms.components.security.controllers.auth, {$scope:scope });
        security = SECURITY;
        authenticationService = AuthenticationService;
        state = $state;

        spyOn(ctrl, 'register').and.callThrough();
        spyOn(state, 'go').and.stub();
      }));

      it('should call register and set url to "#/', function(){
        ctrl.register(
          postData.username,
          postData.password,
          postData.password,
          postData.fullName,
          postData.email);

        scope.$apply();
        expect(ctrl.register).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
      });

      it('should have set the user object and authentication state', function(){
        ctrl.register(
          postData.username,
          postData.password,
          postData.password,
          postData.fullName,
          postData.email);
        scope.$apply();
        expect(ctrl.user.username).toEqual('username');
        expect(ctrl.authenticated).toBeTruthy();
      });

    }); /* END success */

  }); /* END register */

}); /* END auth-controller */
/* END TESTS */
