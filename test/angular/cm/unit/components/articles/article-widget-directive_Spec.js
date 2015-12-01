/**
* article-widget-directive.js tests
* @author jvwong
* @created 18/11/15
*/

/* START TESTS */
describe('article-widget', function () {



  var
    compile,
    mockBackend,
    rootScope,
    article = {
      "id": "91a950f6-3d98-494e-a851-c01d868f0e9b",
      "version": null,
      "createdDate": "2015-11-12T16:49:26.886Z",
      "lastModifiedDate": null,
      "createdBy": "ertertert",
      "updatedBy": null,
      "title": "partick lynch",
      "description": "who kjsdlfj",
      "keywords": "sdlkf sd fsdddd dd ",
      "pages": []
    }
    ;

  beforeEach(module(cms.components.articles.name));
  beforeEach(inject(function($compile, $httpBackend, $rootScope){
    compile = $compile;
    mockBackend =  $httpBackend;
    rootScope = $rootScope;
  }));

  it('should render html based on scope correctly', function(){

    var
      scope,
      compiledElementScope,
      element
        ;

    // declare and initialize a new scope
    scope = rootScope.$new();
    scope.myArticle = angular.copy(article);
    scope.title = article.title;

    // create the html template
    mockBackend.expectGET('cm/templates/components/articles/article-widget.html')
      .respond(
      '<div ng-bind="articleTitle"></div>' +
      '<div ng-bind="articleContent.description"></div>' +
      '<div ng-bind="articleContent.createdDate"></div>');

    // create the html itself
    element = compile(
      '<div article-widget ' +
      '     article-content="myArticle"' +
      '     article-title="{{title}}">' +
      '</div>')(scope);

    scope.$digest();
    mockBackend.flush();

    expect(element.html()).toEqual(
      '<div ng-bind="articleTitle" class="ng-binding">' +
        article.title +
      '</div>' +
      '<div ng-bind="articleContent.description" class="ng-binding">' +
        article.description +
      '</div>' +
      '<div ng-bind="articleContent.createdDate" class="ng-binding">' +
         article.createdDate +
    '</div>'
    );

    // Step 6
    compiledElementScope = element.isolateScope();
    expect(compiledElementScope.articleContent).toEqual(article);
    expect(compiledElementScope.articleTitle).toEqual(article.title);

  });

}); /* END article-widget */
