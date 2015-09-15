'use strict';

angular.module('app')
    .controller('SectionListCtrl', function ($scope, $rootScope, sectionService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    sectionService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);
                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };

        $scope.newSection = function () {
            var modalInstance = $modal.open({
                templateUrl: 'section_add',
                controller: 'SectionAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newSection dismissed at: ' + new Date());
            });
        };

        $scope.editSection = function (sectionId) {

            var modalInstance = $modal.open({
                templateUrl: 'section_edit',
                controller: 'SectionEditCtrl',
                size: 'lg',
                resolve: {
                    sectionId: function () {
                        return sectionId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editSection dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this section!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                sectionService.remove(device._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };

      $rootScope.$on('reload-tableParams', function(event, args) {
        $scope.tableParams.reload();
      });


      $scope.initDataTable();

    });
