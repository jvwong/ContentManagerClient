/**
* article-service.js tests
* @author jvwong
* @created 18/11/15
*/

/* START TESTS */
describe('article-service', function () {

  var
    articleService, rootScope;

  beforeEach(module(cms.components.articles.name));
  beforeEach(module('DataLoaderPromiseMock'));
  beforeEach(module('UrlServiceMock'));
  beforeEach(inject(function(ArticleService, $rootScope){
    articleService = ArticleService;
    rootScope = $rootScope;
  }));

  describe('findAll/findOne', function(){
    describe('findAll', function(){
      var fetched;
      it('should return a list of articles', function(){
        articleService.findAll(1)
          .then(function(response){
            fetched = response;
          });
        expect(fetched).toBeUndefined();
        rootScope.$apply();
        expect(fetched.status).toEqual(200);
      });
    }); /* END findAll */


    describe('findOne', function(){
      var fetched;
      it('should return the particular article', function(){
        articleService.findOne('23')
          .then(function(response){
            fetched = response;
          });
        expect(fetched).toBeUndefined();
        rootScope.$apply();
        expect(fetched.status).toEqual(200);
      });
    }); /* END findOne */

  }); /* findAll/findOne */

  describe('create', function(){
    it('should return the created article', function(){
      var fetched;
      articleService.create("title", "description", "keywords")
        .then(function(response){
          fetched = response;
        });
      expect(fetched).toBeUndefined();
      rootScope.$apply();
      expect(fetched.status).toEqual(201);
    });

  }); /* END create */


}); /* END authentication-service */
