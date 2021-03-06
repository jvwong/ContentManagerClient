/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
  .directive('articleWidget', [
      'ARTICLES',
      function (ARTICLES){
    return {
      templateUrl: ARTICLES.homeDir + 'templates/article-widget.html',
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
        ].join('/');
      }
    };
  }]);
}(angular, cms));
