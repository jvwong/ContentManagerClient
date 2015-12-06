/* global angular */
(function (angular, cms) {
  'use strict';

  angular.module(cms.components.security.name)

  ////////////
  // Users  //
  ////////////
  .controller(cms.components.security.controllers.users,
    [            '$scope', '$stateParams',
      function (  $scope,   $stateParams ) {
      }])


    ////////////////////
    // Users > Detail //
    ////////////////////
    .controller(cms.components.security.controllers.usersDetail,
    [         '$scope', '$state', '$stateParams', 'user_fetched', 'toastr', 'SECURITY', cms.components.security.services.AuthenticationService,
      function($scope,   $state,   $stateParams,   user_fetched,   toastr,   SECURITY, AuthenticationService ){

        var self;
        self = this;
        self.user = user_fetched;

        self.remove = function(username){
          AuthenticationService
            .remove(username)
            .then(function(response){
              if(response.status === 204)
              {
                toastr.info('Deletion successful', 'Info');
                AuthenticationService.logout();
                $state.go(SECURITY.routing.states.authLogin);
              }
            });
        };
      }])


    ////////////////////////////////
    //// Articles > Detail > Edit //
    ////////////////////////////////
    //.controller(cms.components.articles.controllers.articlesDetailEdit,
    //[           '$scope', '$state', '$stateParams', 'article_fetched', 'ARTICLES', cms.components.articles.services.ArticleService,
    //  function ( $scope,   $state,   $stateParams,   article_fetched,   ARTICLES,  ArticleService) {
    //    var self;
    //    self = this;
    //    self.formErrors = ['Update failed'];
    //    self.articleItemForm = {};
    //
    //    self.article = article_fetched.data;
    //    self.key = $stateParams.itemId;
    //    self.item = self.article[$stateParams.itemId];
    //
    //    self.update = function(update_value){
    //      var patch = {
    //        op    : 'replace',
    //        path  : '/' + self.key,
    //        value : update_value
    //      };
    //
    //      ArticleService
    //        .update(self.article.id, [patch])
    //        .then(function(response){
    //          if(response.status === 200)
    //          {
    //            //Update the data
    //            self.article = response.data;
    //
    //            $state.go(ARTICLES.routing.states.articlesDetailEdit,
    //              $stateParams,
    //              { reload: true });
    //          }
    //        });
    //    };
    //            //update.addProperty("op", update_operation);
    //    //update.addProperty("path", update_path);
    //    //update.addProperty("value", update_value);
    //
    //
    //  }])
;

}(angular, cms));
