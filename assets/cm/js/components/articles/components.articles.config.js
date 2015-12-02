/* global angular, cms */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.articles.name)
    .constant('ARTICLES', {
      pagination: {
        bootstrap_rest_map: {
          totalItems: "totalElements",
          itemsPerPage: "size",
          currentPage: "number"
        }
      },
      routing: {
        states: {
          articles: 'articles',
          articlesList: 'articles.list',
          articlesCreate: 'articles.create'
        },
        urls: {
          articles: '/articles'
        }
      }
    })
  ;
}(angular, cms));
