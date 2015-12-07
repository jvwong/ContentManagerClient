/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.articles = {
    name: 'cms-components-articles',
    services: {
      ArticleService  : 'ArticleService'
    },
    controllers: {
      articles                : 'cmArticleCtrl',
      articlesList            : 'cmArticleListCtrl',
      articlesCreate          : 'cmArticleCreateCtrl',
      articlesDetailEdit      : 'cmArticleDetailEditCtrl'
    },
    directives: {
      articleWidget: 'articleWidget'
    }
  };

  angular.module(cms.components.articles.name, [
      'ui.router',
      'uiRouterStyles',
      'ui.bootstrap',
      'toastr',
      cms.components.data.name,
      cms.components.security.name
    ]);
}(angular, cms));
