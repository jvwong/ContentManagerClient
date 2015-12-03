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
  ctrl
  ;

  beforeEach(module(cms.components.articles.name));
  beforeEach(module('DataLoaderPromiseMock'));
  beforeEach(module('UrlServiceMock'));
  beforeEach(module('ArticleServiceMocks'));
  beforeEach(module(function($provide) {
    var article_list = {
      config: {},
      headers: function(){},
      statusText: 200,
      data: {
        content: ["Hi"]
      }
    };
    $provide.value('article_list', article_list);
  }));

  describe(cms.components.articles.controllers.articles, function(){
    beforeEach(inject(function($rootScope,
                               $controller){
      scope = $rootScope;
      ctrl = $controller(cms.components.articles.controllers.articles, { $scope:scope });
    }));

    it('should have a articles attribute', function(){
      expect(ctrl).toBeDefined();
    });
  });/* END cmArticleCtrl */

}); /* END article-controller */

