/**
 * auth-controller.js tests
 * @author jvwong
 * @created 09/11/15
 */

/* START TESTS */
describe('home-controller', function () {

  var
  location,
  scope,
  ctrl,
  security,
  cm,
  mockBackend,

  MIME_TYPE_JSON = 'application/json;charset=UTF-8',
  headers = {
    'Accept': MIME_TYPE_JSON
  },
  endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/',
  articleUrl,
  returnData = [
    {
      "id": "91a950f6-3d98-494e-a851-c01d868f0e9b",
      "version": null,
      "createdDate": "2015-11-12T16:49:26.886Z",
      "lastModifiedDate": null,
      "createdBy": "ertertert",
      "updatedBy": null,
      "title": "partick lynch",
      "description": "who kjsdlfj ",
      "keywords": "sdlkf sd fsdddd dd ",
      "pages": []
    },
    {
      "id": "2d2ff8b0-e0ca-4360-9065-2ee2b6544dfd",
      "version": null,
      "createdDate": "2015-11-13T00:06:40.875Z",
      "lastModifiedDate": null,
      "createdBy": "ertertert",
      "updatedBy": null,
      "title": "asdasdasd",
      "description": "werwerwerwer",
      "keywords": "dfffff",
      "pages": null
    },
    {
      "id": "7cb4c95e-36e7-4bbc-aee3-02f965c7b614",
      "version": null,
      "createdDate": "2015-11-13T00:10:00.457Z",
      "lastModifiedDate": null,
      "createdBy": "asdasdasd",
      "updatedBy": null,
      "title": "another title",
      "description": "another description",
      "keywords": "another keywods",
      "pages": null
    }
  ]
  ;

  beforeEach(module('cmApp'));
  beforeEach(inject(function($rootScope,
                             SECURITY,
                             CM,
                             $controller,
                             $location,
                             $httpBackend){
    scope = $rootScope.$new();
    ctrl = $controller('cmHomeCtrl', {$scope:scope });
    security = SECURITY;
    cm = CM;
    mockBackend = $httpBackend;
    location = $location;
    articleUrl = CM.paths.articles;
    //spyOn(ctrl, 'login').and.callThrough();

    mockBackend.expectGET(endpoint + articleUrl, headers)
      .respond(200, JSON.stringify(returnData));
  }));

  it('should have a self.articles attribute', function(){
    expect(ctrl.articles).toBeDefined();
    expect(ctrl.articles).toEqual([]);
    mockBackend.flush();
  });

  it('should have a self.articles attribute', function(){
    mockBackend.flush();
    expect(ctrl.articles.length).toBeGreaterThan(0);
  });

  afterEach(function(){
    mockBackend.verifyNoOutstandingExpectation(); //expectX calls
    mockBackend.verifyNoOutstandingRequest(); //flush calls
  });


}); /* END auth-controller */
/* END TESTS */
