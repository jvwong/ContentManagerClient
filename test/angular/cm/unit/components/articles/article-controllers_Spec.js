/**
* article-controller.js tests
* @author jvwong
* @created 09/11/15
*/

/* START TESTS */
describe('article-controller', function () {

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
  returnData = {
    "content": [
      {
        "id": "5658da23e4b0151630209b41",
        "version": 0,
        "createdDate": "2015-11-27T22:33:07.820Z",
        "lastModifiedDate": "2015-11-27T22:33:07.820Z",
        "author": "asdasdasd",
        "updater": "asdasdasd",
        "title": "this is some title for a regular cms user",
        "description": "another description",
        "keywords": "another keywods",
        "pages": null
      },
      {
        "id": "5658da23e4b0151630209b40",
        "version": 0,
        "createdDate": "2015-11-27T22:33:07.324Z",
        "lastModifiedDate": "2015-11-27T22:33:07.324Z",
        "author": "asdasdasd",
        "updater": "asdasdasd",
        "title": "this is some title for a regular cms user",
        "description": "another description",
        "keywords": "another keywods",
        "pages": null
      },
      {
        "id": "5658da22e4b0151630209b3f",
        "version": 0,
        "createdDate": "2015-11-27T22:33:06.884Z",
        "lastModifiedDate": "2015-11-27T22:33:06.884Z",
        "author": "asdasdasd",
        "updater": "asdasdasd",
        "title": "this is some title for a regular cms user",
        "description": "another description",
        "keywords": "another keywods",
        "pages": null
      }
    ],
    "last": true,
    "totalPages": 1,
    "totalElements": 3,
    "sort": [
      {
        "direction": "DESC",
        "property": "createdDate",
        "ignoreCase": false,
        "nullHandling": "NATIVE",
        "ascending": false
      }
    ],
    "numberOfElements": 3,
    "first": true,
    "size": 10,
    "number": 0
  }
  ;

  beforeEach(module('cmApp'));


  describe('cmArticleListCtrl', function(){
    beforeEach(inject(function($rootScope,
                               SECURITY,
                               CM,
                               $controller,
                               $location,
                               $httpBackend){
      scope = $rootScope.$new();
      ctrl = $controller('cmArticleListCtrl', {$scope:scope });
      security = SECURITY;
      cm = CM;
      mockBackend = $httpBackend;
      location = $location;
      articleUrl = CM.paths.articles;

      mockBackend.expectGET(endpoint + articleUrl + "?page=1", headers)
        .respond(200, JSON.stringify(returnData));
    }));

    it('should have a self.articles attribute', function(){
      expect(ctrl.data).toBeDefined();
      expect(ctrl.data).toEqual({});
      mockBackend.flush();
    });

    it('should have a self.articles attribute', function(){
      mockBackend.flush();
      expect(ctrl.data).not.toEqual({});
      expect(ctrl.data.content).toBeDefined();
      expect(ctrl.totalItems).toEqual(returnData.numberOfElements);
      expect(ctrl.itemsPerPage).toEqual(returnData.size);
      expect(ctrl.currentPage).toEqual(returnData.number + 1);
    });

    afterEach(function(){
      mockBackend.verifyNoOutstandingExpectation(); //expectX calls
      mockBackend.verifyNoOutstandingRequest(); //flush calls
    });
  });/* END cmArticleListCtrl */

}); /* END article-controller */

