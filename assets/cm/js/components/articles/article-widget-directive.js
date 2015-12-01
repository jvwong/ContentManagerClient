(function (angular, cms) {
  'use strict';
  angular.module(cms.modules.app.name)
  .directive('articleWidget', [
      'CM',
      function (CM){
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
          CM.states.articles,
          $scope.articleContent.id
        ].join('/').concat('/');
      }
    };
  }]);
}(angular, cms));
