angular.module('cmApp')
  .directive('articleWidget', [function (){
      return {
        templateUrl: '../../../templates/components/articles/article-widget.html',
        restrict: 'A',
        scope: {
          articleContent: '=',
          articleTitle: '@'
        },
        link: function($scope, $element, $attrs) {
          //console.log('link');
          //console.log('$element', $element);
          //console.log('$attrs', $attrs);
        }
      };
    }]);
