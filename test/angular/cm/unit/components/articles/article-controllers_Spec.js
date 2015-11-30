/**
* article-controller.js tests
* @author jvwong
* @created 09/11/15
*/

/* START TESTS */
describe('article-controller', function () {

  var
  state,
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
  articleUrl
  ;

  beforeEach(module('cmApp'));

  describe('cmArticleCtrl', function(){
    beforeEach(inject(function($rootScope,
                               $controller){
      scope = $rootScope.$new();
      ctrl = $controller('cmArticleCtrl', { $scope:scope });
    }));

    it('should have a self.radioModel attribute', function(){
      expect(ctrl.radioModel).toBeFalsy();
    });
  });/* END cmArticleCtrl */

  describe('cmArticleListCtrl', function(){
    var returnData = {
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
    };

    beforeEach(inject(function($rootScope,
                               SECURITY,
                               CM,
                               $controller,
                               $state,
                               $httpBackend){
      scope = $rootScope.$new();
      ctrl = $controller('cmArticleListCtrl', {$scope:scope });
      security = SECURITY;
      cm = CM;
      mockBackend = $httpBackend;
      state = $state;
      articleUrl = (CM.paths.articles).trim().replace(/^\/|\/$/g, '');

      mockBackend.expectGET(endpoint + articleUrl + "/?page=1", headers)
        .respond(200, JSON.stringify(returnData));
    }));

    it('should have a self.articles attribute', function(){
      // console.log(ctrl);
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



  describe('cmArticleCreateCtrl', function(){

    var postData = {
        "title": "this is some title for a regular cms user",
        "description": "another description",
        "keywords": "another keywods"
      },

      returnData = {
        "id": "565cbadce4b0f0c56fbb9b3d",
        "version": 0,
        "createdDate": "2015-11-30T21:08:44.347Z",
        "lastModifiedDate": "2015-11-30T21:08:44.347Z",
        "author": "asdasdasd",
        "updater": "asdasdasd",
        "title": "this is some title for a regular cms user",
        "description": "another description",
        "keywords": "another keywods",
        "pages": null
      }
      ;

    describe('createArticle', function(){
      var headers = {
          'Accept': MIME_TYPE_JSON,
          'Content-Type': MIME_TYPE_JSON
        };
      describe('success', function(){

        beforeEach(inject(function($rootScope,
                                   SECURITY,
                                   CM,
                                   $controller,
                                   $state,
                                   $httpBackend){
          scope = $rootScope.$new();
          ctrl = $controller('cmArticleCreateCtrl', {$scope:scope });
          security = SECURITY;
          mockBackend = $httpBackend;
          state = $state;

          spyOn(ctrl, 'createArticle').and.callThrough();
          articleUrl = (CM.paths.articles).trim().replace(/^\/|\/$/g, '');


          mockBackend.expectPOST(endpoint + articleUrl + '/', postData, headers)
            .respond(201, JSON.stringify(returnData));
        }));

        it('should call createArticle', function(){
          ctrl.createArticle(
            postData.title,
            postData.description,
            postData.keywords);
          mockBackend.flush();
          expect(ctrl.createArticle).toHaveBeenCalled();
        });

        it('should set the data attribute', function(){
          ctrl.createArticle(
            postData.title,
            postData.description,
            postData.keywords);
          mockBackend.flush();
          expect(ctrl.data).toEqual(returnData);
        });

        afterEach(function(){
          mockBackend.verifyNoOutstandingExpectation(); //expectX calls
          mockBackend.verifyNoOutstandingRequest(); //flush calls
        });

      }); /* END success */

      describe('failure', function(){

        beforeEach(inject(function($rootScope,
                                   SECURITY,
                                   CM,
                                   $controller,
                                   $state,
                                   $httpBackend){
          scope = $rootScope.$new();
          ctrl = $controller('cmArticleCreateCtrl', {$scope:scope });
          security = SECURITY;
          mockBackend = $httpBackend;
          state = $state;

          spyOn(ctrl, 'createArticle').and.callThrough();
          articleUrl = (CM.paths.articles).trim().replace(/^\/|\/$/g, '');


          mockBackend.expectPOST(endpoint + articleUrl + '/', postData, headers)
            .respond(500, 'Server error');
        }));

        it('should call createArticle', function(){
          ctrl.createArticle(
            postData.title,
            postData.description,
            postData.keywords);
          mockBackend.flush();
          expect(ctrl.createArticle).toHaveBeenCalled();
        });

        it('should not have set the data attribute', function(){
          ctrl.createArticle(
            postData.title,
            postData.description,
            postData.keywords);
          mockBackend.flush();
          expect(ctrl.data).toEqual({});
        });

        afterEach(function(){
          mockBackend.verifyNoOutstandingExpectation(); //expectX calls
          mockBackend.verifyNoOutstandingRequest(); //flush calls
        });

      });/* END failure */

    }); /* END createArticle */

  }); /* END cmArticleCreateCtrl */

}); /* END article-controller */

