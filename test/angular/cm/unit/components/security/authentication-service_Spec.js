/**
 * authentication-service.js tests
 * @author jvwong
 * @created 18/11/15
 */

/* START TESTS */
describe('authentication-service', function () {

  var
    authenticationService,
    fetched,

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
    },
    mockBackend
    ;

  beforeEach(module('cmApp'));

  beforeEach(inject(function(AuthenticationService, $httpBackend){
    authenticationService = AuthenticationService;
    mockBackend = $httpBackend;
    mockBackend.expectPOST(targetUrl, postData, headers)
      .respond(JSON.stringify(returnData));
  }));

  describe('login', function(){

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

    beforeEach(function(){
      authenticationService
        .login(postData.username, postData.password);
    });

    it('should be undefined before http call', function(){
      fetched = authenticationService.getCurrentLoginUser();
      expect(fetched).not.toBeDefined();
      mockBackend.flush();
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

}); /* END authentication-service */
