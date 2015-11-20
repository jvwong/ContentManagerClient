/**
 * article-service.js tests
 * @author jvwong
 * @created 18/11/15
 */

/* START TESTS */
describe('article-service', function () {

  var
  MIME_TYPE_JSON = 'application/json;charset=UTF-8',
  headers = {
    'Accept': MIME_TYPE_JSON
  },
  endpoint = 'http://127.0.0.1:8080/cm-web-0.1-SNAPSHOT/services/rest/',
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
  ],
  articleService,
  articleUrl,
  mockBackend,
  cm,
  fetched
    ;

  beforeEach(module('cmApp'));
  beforeEach(inject(function(ArticleService,
                             $httpBackend,
                             CM){
    articleService = ArticleService;
    mockBackend = $httpBackend;
    cm = CM;
  }));

  describe('findAll', function(){
    beforeEach(function(){
      mockBackend.expectGET(endpoint + 'articles/', headers)
        .respond(200, JSON.stringify(returnData));
    });

    it('should return a list of articles', function(){
      articleService.findAll()
        .then(function(response){
          fetched = response;
        });
      mockBackend.flush();
      expect(fetched.data.length).toBeGreaterThan(0);
    });

    afterEach(function(){
      mockBackend.verifyNoOutstandingExpectation(); //expectX calls
      mockBackend.verifyNoOutstandingRequest(); //flush calls
    });
  }); /* END findAll */


  describe('findOne', function(){

    var dataP = returnData[0];
    var tarUrl = endpoint + 'articles/' + dataP.id + '/';

    beforeEach(function(){
      mockBackend.expectGET(tarUrl, headers)
        .respond(200, JSON.stringify(dataP));
    });

    it('should return the particular article', function(){
      articleService.findOne(dataP.id)
        .then(function(response){
          fetched = response;
        });
      mockBackend.flush();
      expect(fetched.data.id).toEqual(dataP.id);
    });

    afterEach(function(){
      mockBackend.verifyNoOutstandingExpectation(); //expectX calls
      mockBackend.verifyNoOutstandingRequest(); //flush calls
    });
  }); /* END findOne */


}); /* END authentication-service */
