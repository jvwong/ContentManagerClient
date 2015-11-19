/**
 * auth-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('auth-controller', function () {

  var
  authenticationService,
  tokenStorageService,
  authenticationStorageService,
  fetched,
  security,
  location,
  scope,
  ctrl,
  mockBackend,

  MIME_TYPE_JSON = 'application/json;charset=UTF-8',
  headers = {
    'Content-Type': MIME_TYPE_JSON,
    'Accept': MIME_TYPE_JSON
  },
  endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/',
  authUrl = 'auth/',
  targetUrl = endpoint + authUrl,
  postData = {
    username: 'adminUser',
    password: 'asdasdasd'
  },

  returnData = {
    "id": "10929DF8-15C5-472B-9398-7158AB89A0A6",
    "version": 0,
    "createdDate": "2015-01-12T02:32:29Z",
    "lastModifiedDate": "2015-01-12T02:32:29Z",
    "fullName": "fullnameAdmin",
    "username": "adminUser",
    "role": "ROLE_ADMIN"
  },

  userData = {
    id: returnData.id,
    username: returnData.username,
    fullName: returnData.fullName,
    createdDate: returnData.createdDate,
    permissions: returnData.role
  }
  ;

  beforeEach(module('cmApp'));

  describe('login', function(){

    describe('success', function(){

      beforeEach(inject(function($rootScope,
                                 SECURITY,
                                 $controller,
                                 $location,
                                 AuthenticationStorageService,
                                 AuthenticationService,
                                 TokenStorageService,
                                 $httpBackend){
        scope = $rootScope.$new();
        ctrl = $controller('cmAuthCtrl', {$scope:scope });
        security = SECURITY;
        authenticationService = AuthenticationService;
        authenticationStorageService = AuthenticationStorageService;
        tokenStorageService = TokenStorageService;
        mockBackend = $httpBackend;
        location = $location;

        spyOn(ctrl, 'login').and.callThrough();
        spyOn(tokenStorageService, 'store').and.stub();
        spyOn(authenticationStorageService, 'store').and.stub();

        mockBackend.expectPOST(targetUrl, postData, headers)
          .respond(JSON.stringify(returnData));
      }));

      it('should call the login function and set url to "#/', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(ctrl.login).toHaveBeenCalled();
        expect(location.url()).toEqual(security.routes.success);
      });

      it('should attempt to set the user token', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(tokenStorageService.store).toHaveBeenCalled();
        expect(authenticationStorageService.store).toHaveBeenCalled();
      });

      it('should have set the user object and authentication state', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(ctrl.user.username).toEqual(postData.username);
        expect(ctrl.authenticated).toBeTruthy();
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END success */

    describe('failure', function(){

      beforeEach(inject(function($rootScope,
                                 SECURITY,
                                 $controller,
                                 $location,
                                 AuthenticationStorageService,
                                 AuthenticationService,
                                 TokenStorageService,
                                 $httpBackend){
        scope = $rootScope.$new();
        ctrl = $controller('cmAuthCtrl', {$scope:scope });
        security = SECURITY;
        authenticationStorageService = AuthenticationStorageService;
        authenticationService = AuthenticationService;
        tokenStorageService = TokenStorageService;
        mockBackend = $httpBackend;
        location = $location;

        spyOn(ctrl, 'login').and.callThrough();
        spyOn(tokenStorageService, 'store').and.stub();
        spyOn(authenticationStorageService, 'store').and.stub();

        mockBackend.expectPOST(targetUrl, postData, headers)
          .respond(500, 'Server error');
      }));

      it('should call the login function but reboot the login page', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(ctrl.login).toHaveBeenCalled();
        expect(location.url()).toEqual(security.routes.fail);
      });

      it('should not set the user token', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(tokenStorageService.store).not.toHaveBeenCalled();
        expect(authenticationStorageService.store).not.toHaveBeenCalled();
      });

      it('should not set the user object and authentication state', function(){
        ctrl.login(postData.username, postData.password);
        mockBackend.flush();
        expect(ctrl.user).toBe(null);
        expect(ctrl.authenticated).toBeFalsy();
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END failure */

  }); /* END login */

  describe('logout', function(){

    beforeEach(inject(function($rootScope,
                               SECURITY,
                               $controller,
                               $location,
                               AuthenticationService,
                               AuthenticationStorageService,
                               TokenStorageService,
                               $httpBackend){
      scope = $rootScope.$new();
      ctrl = $controller('cmAuthCtrl', {$scope:scope });
      security = SECURITY;
      authenticationStorageService = AuthenticationStorageService;
      authenticationService = AuthenticationService;
      tokenStorageService = TokenStorageService;
      mockBackend = $httpBackend;
      location = $location;

      spyOn(ctrl, 'logout').and.callThrough();
      spyOn(tokenStorageService, 'clear').and.stub();
      spyOn(authenticationStorageService, 'clear').and.stub();

      mockBackend.expectPOST(targetUrl, postData, headers)
        .respond(returnData);
      ctrl.login(postData.username, postData.password);
      mockBackend.flush();
    }));

    it('should call the logout function and set url to "#/', function(){
      ctrl.logout();
      expect(ctrl.logout).toHaveBeenCalled();
      expect(location.url()).toEqual(security.routes.login);
    });

    it('should attempt to clear the user token', function(){
      ctrl.logout();
      expect(tokenStorageService.clear).toHaveBeenCalled();
      expect(authenticationStorageService.clear).toHaveBeenCalled();
    });

    it('should have set the user object and authentication state', function(){
      ctrl.logout();
      expect(ctrl.user.username).toBeUndefined();
      expect(ctrl.authenticated).toBeFalsy();
    });

  }); /* END logout */

}); /* END auth-controller */
/* END TESTS */
