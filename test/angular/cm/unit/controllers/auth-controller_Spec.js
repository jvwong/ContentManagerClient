/**
 * auth-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('auth-controller', function () {

  var
    MIME_TYPE_JSON = 'application/json;charset=UTF-8',
    headers = {
      'Content-Type': MIME_TYPE_JSON,
      'Accept': MIME_TYPE_JSON
    },
    endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/',
    authUrl = 'auth/',
    ctrl,
    mockBackend;

  describe('login', function(){
    var postData = {
        username: 'adminUser',
        password: 'asdasdasd'
      },

      returnData = [{
        "id": "10929DF8-15C5-472B-9398-7158AB89A0A6",
        "version": 0,
        "createdDate": "2015-01-12T02:32:29Z",
        "lastModifiedDate": "2015-01-12T02:32:29Z",
        "fullName": "fullnameAdmin",
        "username": "adminUser",
        "role": "ROLE_ADMIN"
      }],
      targetUrl = endpoint + authUrl
    ;

    beforeEach(module('cmApp'));
    beforeEach(inject(function($controller, $httpBackend){
      ctrl = $controller('cmAuthCtrl');
      mockBackend = $httpBackend;
      mockBackend.expectPOST(targetUrl, postData, headers)
        .respond(returnData);
    }));

    it('should have data after server call', function(){
      ctrl.username = postData.username;
      ctrl.password = postData.password;
      ctrl.login();
      mockBackend.flush();
      expect(ctrl.data).toEqual(returnData);
      expect(ctrl.authenticated).toEqual(true);
    });

    afterEach(function(){
      mockBackend.verifyNoOutstandingExpectation(); //expectX calls
      mockBackend.verifyNoOutstandingRequest(); //flush calls
    });

  }); /* END login */

}); /* END auth-controller */
/* END TESTS */
