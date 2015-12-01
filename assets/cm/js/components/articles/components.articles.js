/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.articles = {
    name: 'cms-components-articles',
    services: {
      ArticleService  : 'ArticleService'
    },
    controllers: {
      article: 'cmArticleCtrl',
      articleList: 'cmArticleListCtrl',
      articleCreate: 'cmArticleCreateCtrl'
    },
    directives: {
      articleWidget: 'articleWidget'
    }
  };

  angular.module(cms.components.articles.name, [
      cms.components.data.name,
      'ui.router'
    ]);
}(angular, cms));
