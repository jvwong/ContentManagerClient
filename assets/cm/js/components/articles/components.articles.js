/* global angular, cms */
(function (angular, cms) {
  'use strict';

  cms.components.articles = {
    name: 'cms-components-articles',
    services: {
      ArticleService  : 'ArticleService'
    },
    controllers: {

    },
    directives: {
    }
  };

  angular.module(cms.components.articles.name, [
      cms.components.data.name
    ]);
}(angular, cms));
