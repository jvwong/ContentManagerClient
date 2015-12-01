/* global angular */
(function (angular, cms) {
  angular.module(cms.components.app.name)
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
