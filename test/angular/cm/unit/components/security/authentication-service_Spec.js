/**
 * authentication-service.js tests
 * @author jvwong
 * @created 18/11/15
 */

/* START TESTS */
describe('authentication-service', function () {

  var
    authenticationService,

    MIME_TYPE_JSON = 'application/json;charset=UTF-8',
    headers = {
      'Content-Type': MIME_TYPE_JSON,
      'Accept': MIME_TYPE_JSON
    },
    endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/',
    mockBackend
    ;

  beforeEach(module('cmApp'));

  describe('login, logout, getCurrentLoginUser', function(){

    var
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
        "role": "ROLE_CMSUSER"
      },

      userData = {
        id: returnData.id,
        username: returnData.username,
        fullName: returnData.fullName,
        createdDate: returnData.createdDate,
        permissions: returnData.role
      };

    beforeEach(inject(function(AuthenticationService, $httpBackend){
      authenticationService = AuthenticationService;
      mockBackend = $httpBackend;
      mockBackend.expectPOST(targetUrl, postData, headers)
        .respond(JSON.stringify(returnData));
    }));

    describe('login', function(){
      var fetched;

      beforeEach(function(){
        spyOn(authenticationService, 'login').and.callThrough();
        authenticationService
          .login(postData.username, postData.password)
          .then(function(response){
            fetched = response.data;
          });
      });

      it('should have the correct server data for user', function(){
        expect(authenticationService.login)
          .toHaveBeenCalledWith(postData.username, postData.password);
        mockBackend.flush();
        expect(fetched).toBeDefined();
        expect(fetched.id).toBeDefined();
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END login */



    describe('getCurrentLoginUser', function(){
      var fetched;

      beforeEach(function(){
        authenticationService
          .login(postData.username, postData.password)
          .then(function(response){
            fetched = response.data;
          });
      });

      it('should call getCurrentLoginUser', function(){
        mockBackend.flush();
        fetched = authenticationService.getCurrentLoginUser();
        expect(fetched).toBeDefined();
        expect(fetched.id).toEqual(returnData.id);
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END getCurrentLoginUser */

    describe('logout', function(){
      var fetched;

      beforeEach(function(){
        spyOn(authenticationService, 'logout').and.callThrough();
        authenticationService
          .login(postData.username, postData.password);
      });

      it('should call getCurrentLoginUser', function(){
        mockBackend.flush();
        fetched = authenticationService.getCurrentLoginUser();
        expect(fetched).toBeDefined();
        authenticationService.logout();
        fetched = authenticationService.getCurrentLoginUser();
        expect(fetched).not.toBeDefined();
      });

      afterEach(function(){
        mockBackend.verifyNoOutstandingExpectation(); //expectX calls
        mockBackend.verifyNoOutstandingRequest(); //flush calls
      });

    }); /* END logout */

  }); /* END login, logout, getCurrentLoginUser */

  describe('register', function(){

    var fetched,
      authUrl = 'auth/',
      userUrl = 'users/',

    postData = {
      username: 'username24',
      password: 'password24',
      fullName: 'fullname24',
      email: 'email24@email.com',
      role: 'ROLE_CMSUSER'
    },

    returnData = {
      "id": "ff808181511823c80151258167aa0000",
      "version": 0,
      "createdDate": "2015-11-20T15:26:56.310Z",
      "lastModifiedDate": "2015-11-20T15:26:56.310Z",
      "fullName": "fullname24",
      "username": "username24",
      "role": "ROLE_CMSUSER"
    },

    userData = {
      id: returnData.id,
      username: returnData.username,
      fullName: returnData.fullName,
      createdDate: returnData.createdDate,
      permissions: returnData.role
    };

    beforeEach(inject(function(AuthenticationService, $httpBackend){
      authenticationService = AuthenticationService;
      mockBackend = $httpBackend;
      mockBackend.expectPOST(endpoint + userUrl, postData, headers)
        .respond(201, JSON.stringify(returnData));
      mockBackend.expectPOST(endpoint + authUrl, {
        username: postData.username,
        password: postData.password
      }, headers)
        .respond(JSON.stringify(returnData));
    }));

    beforeEach(function(){
      spyOn(authenticationService, 'register').and.callThrough();
      authenticationService
        .register(postData.username,
          postData.password,
          postData.fullName,
          postData.email)
        .then(function(response){
          fetched = response.data;
        });
    });

    it('should have the correct server data for user', function(){
      expect(authenticationService.register)
        .toHaveBeenCalledWith(
          postData.username,
          postData.password,
          postData.fullName,
          postData.email);
      mockBackend.flush();
      expect(fetched).toBeDefined();
      expect(fetched.id).toBeDefined();
    });

    afterEach(function(){
      mockBackend.verifyNoOutstandingExpectation(); //expectX calls
      mockBackend.verifyNoOutstandingRequest(); //flush calls
    });

  }); /* END register */

}); /* END authentication-service */
