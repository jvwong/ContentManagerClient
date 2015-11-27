(function (angular, cms) {
  'use strict';
  angular.module(cms.modules.app.name)
  .directive('articleWidget', [function (){
    return {
      templateUrl: 'cm/templates/components/articles/article-widget.html',
      restrict: 'A',
      scope: {
        articleContent: '=',
        articleTitle: '@'
      },
      link: function($scope, $element, $attrs) {
      }
    };
  }]);
}(angular, cms));
