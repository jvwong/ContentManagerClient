// /* global angular */
'use strict';
//
// // var utils = require('../utils/utilities.js').utils;
angular.module('cmApp')
    /**
     * Controllers for main app - that is, a global like controller
     */
    .controller('cmMainCtrl', [
        '$scope',
        '$sce',
        '$location',
        'user',
      function($scope, $sce, $location, user) {

        var
          self
//           pageContext =  {
//             tabname: undefined
//           },
        //   path,
        //   url,
//           /* functions */
//             loadData
          ;


        self = this;
//         self.currentPage = PageSelectService.get();
//         self.about = '';
        self.user = user;
//         self.disclaimer = '';
//         //
//         //console.log('user');
//         //console.log(user);
//
//         /* $http url variables */
//         path = 'about.php';
//         url = UrlService.apiUrl(path);
//
//         /**
//          * loadData is a wrapper around the DataLoaderPromise
//          * Needs the stockContext and selectedDate data
//          */
//         loadData = function(context){
//           DataLoaderPromise.postData(url, context, utils.transformRes).then(
//             function(response) {
//               var data;
//               data = response.data[0];
//               self.about = $sce.trustAsHtml(utils.newlineToBr(data.script));
//             },
//             function(errResponse) {
//               self.errorMessage = errResponse.data.msg;
//             }
//           );
//         };
//
//         var shouldLoad = PageSelectService.list_tabs()
//           .some(function(element, index, array){
//             return element.name === self.currentPage.name;
//           });
//         pageContext.tabname = self.currentPage.name;
//         //console.log('loadData: %s', pageContext.tabname);
//         if(shouldLoad){
//           loadData(pageContext);
//         }
    }]);
