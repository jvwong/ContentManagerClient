/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.modules.app.name)
  .controller('cmArticleListCtrl', [
    'ArticleService',
    function(ArticleService){

      var self;
      self = this;

      self.articles = {};

      // pagination
      self.totalItems = 64;
      self.currentPage = 4;
      self.maxSize = 5;
      self.bigTotalItems = 175;
      self.bigCurrentPage = 1;

      self.setPage = function (pageNo) {
        self.currentPage = pageNo;
      };
      self.pageChanged = function() {
        console.log('Page changed to: ' + self.currentPage);
      };

      ArticleService
        .findAll()
        .then(function(response){
          self.articles = response.data;
        });

    }]); /* END cmHomeCtrl */

}(angular, cms));
