/**
 * data-service.js tests
 * @author jvwong
 * @created 23/12/14
 */

/* START TESTS */
describe('url-service', function () {

  beforeEach(module(cms.components.data.name));

  describe('default endpoint', function(){
    var
      urlService,
      fetched,
      path = "/users";

    beforeEach(inject(function(UrlService){
      urlService = UrlService;
      spyOn(urlService, 'apiUrl').and.callThrough();
      fetched = urlService.apiUrl(path);
    }));

    it('should be defined', function(){
      expect(urlService).toBeDefined();
    });

    it('should have a default endpoint', function(){
      expect(fetched).toMatch('http://');
    });

    it('should contain passed in path', function(){
      expect(fetched).toMatch(path);
    });

    it('should close with a forward slash', function(){
      expect(fetched).toMatch(/.*\/$/);
    });
  }); /* END default endpoint */

  describe('configure endpoint', function(){
    var
      urlService,
      fetched,
      path,
      endpoint,
      urlServiceProvider;

    endpoint = 'http://someotherdomain.com/';
    path = 'flames';

    beforeEach(module(cms.components.data.name, function(UrlServiceProvider){
      urlServiceProvider = UrlServiceProvider;
      urlServiceProvider.setEndpoint(endpoint);
    }));

    beforeEach(inject(function(UrlService){
      urlService = UrlService;
      spyOn(urlService, 'apiUrl').and.callThrough();
      fetched = urlService.apiUrl(path);
    }));

    it('should be defined', function(){
      expect(urlService).toBeDefined();
    });

    it('should contain passed in path', function(){
      expect(fetched).toMatch(path);
      expect(fetched).toMatch(endpoint);
    });
  });

  describe('encodeParams', function(){
    var
      urlService,
      fetched,
      params,
      endpoint,
      path,
      urlServiceProvider;

    endpoint = 'http://someotherdomain.com/';
    params = {
      "page": 1,
      "good": "bye"
    };

    path = endpoint + "?page=1&good=bye";

    beforeEach(module(cms.components.data.name, function(UrlServiceProvider){
      urlServiceProvider = UrlServiceProvider;
      urlServiceProvider.setEndpoint(endpoint);
    }));

    beforeEach(inject(function(UrlService){
      urlService = UrlService;
      spyOn(urlService, 'encodeParams').and.callThrough();
      fetched = urlService.encodeParams(endpoint, params);
    }));

    it('should be defined', function(){
      expect(urlService).toBeDefined();
    });

    it('should contain passed in params', function(){
      expect(fetched).toEqual(path);
    });
  }); /* END default endpoint */

}); /* END  data-service: UrlService */
