/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .constant('ARTICLES', {
      homeDir: "cm/components/articles/",
      pagination: {
        bootstrap_rest_map: {
          totalItems: "totalElements",
          itemsPerPage: "size",
          currentPage: "number"
        }
      },
      routing: {
        states: {
          articles        : 'articles',
          articlesList    : 'articles.list',
          articlesCreate  : 'articles.create',
          articlesDetail  : 'articles.detail'
        },
        urls: {
          articles        : '/articles',
          articlesList    : '',
          articlesCreate  : '/create',
          articlesDetail  : '/{articleId:[a-z0-9]{24}}'
        }
      }
    })
  ;
}(angular, cms));
