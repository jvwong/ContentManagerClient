/* global angular */
(function (angular, cms) {
  angular.module(cms.modules.app.name)
    .constant('ARTICLES', {
      pagination: {
        bootstrap_rest_map: {
          totalItems: "totalElements",
          itemsPerPage: "size",
          currentPage: "number"
        }
      }
    });
}(angular, cms));
