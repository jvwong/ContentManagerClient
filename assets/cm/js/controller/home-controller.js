/* global angular */
'use strict';

angular.module('cmApp')
  .controller('cmHomeCtrl', [
    'ArticleService',
    function(ArticleService){

      var self;
      self = this;

      self.articles = [];

      ArticleService
        .findAll()
        .then(function(response){
          self.articles = response.data;
        });

    }]); /* END cmHomeCtrl */

