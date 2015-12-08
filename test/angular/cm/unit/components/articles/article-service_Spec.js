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
      var fetched,
        data;
      data = {
        title       : "title",
        description : "description",
        keywords    : "keywords"
      };
      articleService.create(data)
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


  describe('recent', function(){
    var value = {
      "id": "56660eb1e4b0f4b4f0797bbe",
      "version": 0,
      "createdDate": "2015-12-07T22:56:49.473Z",
      "lastModifiedDate": "2015-12-07T22:56:49.473Z",
      "author": "asdasdasd",
      "updater": "asdasdasd",
      "title": "this is some title for a regular cms user",
      "description": "another description",
      "keywords": "another keywods",
      "pages": null
    };
    beforeEach(function(){
      spyOn(articleService, 'getRecent').and.returnValue(value);
    });

    describe('getRecent', function(){

      it('should update the given variable', function(){
        var recent;
        recent = articleService.getRecent();
        expect(recent).toBeDefined();
      });
    });

    describe('setRecent', function(){
      it('should set the given variable', function(){
        var recent;
        articleService.setRecent();
        expect(articleService.getRecent()).toEqual(value);
      });
    });

  }); /* END recent */

  describe('articles', function(){
    var value = {
      "content": [
        {
          "id": "566746a5e4b0174e24784336",
          "version": 0,
          "createdDate": "2015-12-08T21:07:49.765Z",
          "lastModifiedDate": "2015-12-08T21:07:49.765Z",
          "author": "asdasdasd",
          "updater": "asdasdasd",
          "title": "asdasdazxc",
          "description": "zxczxczx",
          "keywords": "aasdasdsa",
          "pages": null
        },
        {
          "id": "56674699e4b0174e24784335",
          "version": 0,
          "createdDate": "2015-12-08T21:07:37.803Z",
          "lastModifiedDate": "2015-12-08T21:07:37.803Z",
          "author": "asdasdasd",
          "updater": "asdasdasd",
          "title": "asdasdasd",
          "description": "sdfsdfsdfw",
          "keywords": "werwer",
          "pages": null
        },
        {
          "id": "56671625e4b0174e24784333",
          "version": 0,
          "createdDate": "2015-12-08T17:40:53.808Z",
          "lastModifiedDate": "2015-12-08T17:40:53.808Z",
          "author": "asdasdasd",
          "updater": "asdasdasd",
          "title": "service charge",
          "description": "service charge",
          "keywords": "service charge",
          "pages": null
        },
        {
          "id": "566715ace4b0174e24784332",
          "version": 0,
          "createdDate": "2015-12-08T17:38:52.316Z",
          "lastModifiedDate": "2015-12-08T17:38:52.316Z",
          "author": "asdasdasd",
          "updater": "asdasdasd",
          "title": "some bloat",
          "description": "another bloated description",
          "keywords": "key",
          "pages": null
        },
        {
          "id": "5665d7e5e4b0f4b4f0797bb7",
          "version": 14,
          "createdDate": "2015-12-07T19:03:01.109Z",
          "lastModifiedDate": "2015-12-08T17:37:58.760Z",
          "author": "asdasdasd",
          "updater": "asdasdasd",
          "title": "Sixty five cents",
          "description": "another description",
          "keywords": "another keywods",
          "pages": null
        }
      ],
      "last": false,
      "totalPages": 3,
      "totalElements": 12,
      "sort": [
        {
          "direction": "DESC",
          "property": "lastModifiedDate",
          "ignoreCase": false,
          "nullHandling": "NATIVE",
          "ascending": false
        }
      ],
      "numberOfElements": 5,
      "first": true,
      "size": 5,
      "number": 0
    };
    beforeEach(function(){
      spyOn(articleService, 'getArticles').and.returnValue(value);
    });

    describe('getArticles', function(){
      it('should update the given variable', function(){
        var articles = {};
        articles = articleService.getArticles();
        expect(articles.content.length).toBeGreaterThan(0);
      });
    });

    describe('setArticles', function(){
      it('should set the given variable', function(){
         var articles = [];
        articleService.setArticles();
        expect(articleService.getArticles()).toEqual(value);
      });
    });

  }); /* END recent */

  describe('page', function(){
    var value = 2;

    describe('getPage', function(){
      it('should update the given variable', function(){
        var page;
        spyOn(articleService, 'getPage').and.returnValue(value);
        page = articleService.getPage();
        expect(page).toEqual(value);
      });
    });

    describe('setPage', function(){
      it('should set the given variable', function(){
        var page = 3;
        articleService.setPage(3);
        expect(articleService.getPage()).toEqual(page);
      });
    });

  }); /* END recent */

  describe('current', function(){
    var value = {
      "id": "56660eb1e4b0f4b4f0797bbe",
      "version": 0,
      "createdDate": "2015-12-07T22:56:49.473Z",
      "lastModifiedDate": "2015-12-07T22:56:49.473Z",
      "author": "asdasdasd",
      "updater": "asdasdasd",
      "title": "this is some title for a regular cms user",
      "description": "another description",
      "keywords": "another keywods",
      "pages": null
    };

    describe('getCurrent', function(){
      it('should update the given variable', function(){
        var current;
        spyOn(articleService, 'getCurrent').and.returnValue(value);
        current = articleService.getCurrent();
        expect(current).toEqual(value);
      });
    });

    describe('setCurrent', function(){
      it('should set the given variable', function(){
        spyOn(articleService, 'getCurrent').and.returnValue(value);
        articleService.setCurrent("123456");
        expect(articleService.getCurrent()).toEqual(value);
      });
    });

  }); /* END recent */


}); /* END authentication-service */
