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
      'ui.router',
      cms.components.data.name,
      cms.components.security.name
    ]);
}(angular, cms));
