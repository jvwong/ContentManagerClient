/**
 * data-service.js tests
 * @author jvwong
 * @created 23/12/14
 */

/* START TESTS */
describe('url-service', function () {

  beforeEach(module('cmApp'));

  //describe('default endpoint', function(){
  //  var urlService, fetched, path;
  //  path = 'flames';
  //  beforeEach(inject(function(UrlService){
  //    urlService = UrlService;
  //    spyOn(urlService, 'apiUrl').and.callThrough();
  //    fetched = urlService.apiUrl(path);
  //  }));
  //
  //  it('should be defined', function(){
  //    expect(urlService).toBeDefined();
  //  });
  //
  //  it('should have a default endpoint', function(){
  //    expect(fetched).toMatch('http://');
  //  });
  //
  //  it('should contain passed in path', function(){
  //    expect(fetched).toMatch(path);
  //  });
  //}); /* END default endpoint */

  //describe('configure endpoint', function(){
  //  var
  //    urlService,
  //    fetched,
  //    path,
  //    endpoint,
  //    urlServiceProvider;
  //
  //  endpoint = 'dev';
  //  path = 'flames';
  //
  //  beforeEach(module('growthRaterApp', function(UrlServiceProvider){
  //    urlServiceProvider = UrlServiceProvider;
  //    urlServiceProvider.setEndpoint(endpoint);
  //  }));
  //
  //  beforeEach(inject(function(UrlService){
  //    urlService = UrlService;
  //    spyOn(urlService, 'apiUrl').and.callThrough();
  //    fetched = urlService.apiUrl(path);
  //  }));
  //
  //  it('should be defined', function(){
  //    expect(urlService).toBeDefined();
  //    //console.log(fetched);
  //  });
  //
  //  it('should have a default endpoint', function(){
  //    expect(fetched).not.toMatch('http://');
  //  });
  //
  //  it('should contain passed in path', function(){
  //    expect(fetched).toMatch(path);
  //  });
  //}); /* END default endpoint */

}); /* END  data-service: UrlService */
