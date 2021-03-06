/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .constant('ARTICLES', {
      homeDir: "cm/components/articles/",
      templateDir: {
        articles: "cm/components/articles/templates/articles/"
      },
      pagination: {
        bootstrap_rest_map: {
          totalItems: "totalElements",
          itemsPerPage: "size",
          currentPage: "number"
        }
      },
      routing: {
        states: {
          articles            : 'index.articles',
          articlesList        : 'index.articles.list',
          articlesCreate      : 'index.articles.create',
          articlesDetail      : 'index.articles.detail',
          articlesDetailEdit  : 'index.articles.detail.edit'
        },
        urls: {
          articles            : '/articles',
          articlesList        : '',
          articlesCreate      : '/create',
          articlesDetail      : '/{articleId:[a-z0-9]{24}}',
          articlesDetailEdit  : '/item/:itemId'
        }
      }
    })
  ;
}(angular, cms));
