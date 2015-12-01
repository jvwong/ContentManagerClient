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

  describe(cms.components.articles.controllers.article, function(){
    beforeEach(inject(function($rootScope,
                               $controller){
      scope = $rootScope.$new();
      ctrl = $controller(cms.components.articles.controllers.article, { $scope:scope });
    }));

    it('should have a self.radioModel attribute', inject(function($timeout){
      expect(ctrl.radioModel).toBeFalsy();
      $timeout.flush();
      expect(ctrl.radioModel).toBeTruthy();
    }));
  });/* END cmArticleCtrl */

  describe(cms.components.articles.controllers.articleList, function(){

    beforeEach(inject(function($rootScope,
                               $controller){
      scope = $rootScope;
      ctrl = $controller(cms.components.articles.controllers.articleList, { $scope:scope });
    }));

    it('should have a self.articles attribute', function(){
      // console.log(ctrl);
      expect(ctrl.data).toBeDefined();
      expect(ctrl.data).toEqual({});
    });

    it('should have a self.articles attribute', function(){
      scope.$apply();
      expect(ctrl.data).not.toEqual({});
    });

  });/* END cmArticleListCtrl */

  describe(cms.components.articles.name.articlesCreate, function(){

    describe('createArticle', function(){

        beforeEach(inject(function($rootScope,
                                   $controller,
                                   $state){
          scope = $rootScope;
          ctrl = $controller('cmArticleCreateCtrl', { $scope:scope });
          state = $state;
          spyOn(ctrl, 'createArticle').and.callThrough();
          spyOn($state, 'go').and.stub();
        }));

        it('should call createArticle', function(){
          ctrl.createArticle("title", "description", "keywords");
          scope.$apply();
          expect(ctrl.createArticle).toHaveBeenCalled();
        });

        it('should set the data attribute', function(){
          ctrl.createArticle("title", "description", "keywords");
          scope.$apply();
          expect(ctrl.data).toBeTruthy();
        });
      }); /* END success */

  }); /* END cmArticleCreateCtrl */

}); /* END article-controller */

