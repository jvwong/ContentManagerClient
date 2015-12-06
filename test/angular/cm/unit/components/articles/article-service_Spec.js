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
  beforeEach(inject(function(
    ArticleService,
    $rootScope){
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

  describe('remove', function(){
    it('should remove the given article', function(){
      var fetched
        , ID;

      ID = "abs928374defffff";
      articleService.remove(ID)
        .then(function(response){
          fetched = response;
        });
      expect(fetched).toBeUndefined();
      rootScope.$apply();
      expect(fetched.status).toEqual(200);
    });

  }); /* END remove */

  describe('update', function(){
    it('should update the given article', function(){
      var fetched
        , ID = "abs928374defffff"
        , data = [{
          op    : 'replace',
          path  : '/somepath',
          value : 'some update'
        }];

      articleService.update(ID, data)
        .then(function(response){
          fetched = response;
        });
      expect(fetched).toBeUndefined();
      rootScope.$apply();
      expect(fetched.status).toEqual(200);
    });

  }); /* END update */


}); /* END authentication-service */
