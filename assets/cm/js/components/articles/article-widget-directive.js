(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
  .directive('articleWidget', [
      'ARTICLES',
      function (ARTICLES){
    return {
      templateUrl: 'cm/templates/components/articles/article-widget.html',
      restrict: 'A',
      scope: {
        articleContent: '=',
        articleTitle: '@'
      },
      link: function($scope, $element, $attrs) {
        $scope.articleUrl = [
          '#',
          ARTICLES.routing.states.articles,
          $scope.articleContent.id
        ].join('/').concat('/');
      }
    };
  }]);
}(angular, cms));
