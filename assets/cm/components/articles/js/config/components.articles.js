/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.articles = {
    name: 'cms-components-articles',
    services: {
      ArticleService  : 'ArticleService'
    },
    controllers: {
      articlesList: 'cmArticleListCtrl'
    },
    directives: {
      articleWidget: 'articleWidget'
    }
  };

  angular.module(cms.components.articles.name, [
      'ui.router',
      'uiRouterStyles',
      'ui.bootstrap',
      cms.components.data.name,
      cms.components.security.name
    ]);
}(angular, cms));
