'use strict';

angular.module('app')
    .controller('DeviceListCtrl', function ($scope, deviceService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

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
                    deviceService.getAll(params)
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


        $scope.newDevice = function () {
            var modalInstance = $modal.open({
                templateUrl: 'device_add',
                controller: 'DeviceAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDevice dismissed at: ' + new Date());
            });
        };

        $scope.editDevice = function (deviceId) {

            var modalInstance = $modal.open({
                templateUrl: 'device_edit',
                controller: 'DeviceEditCtrl',
                size: 'lg',
                resolve: {
                    deviceId: function () {
                        return deviceId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDevice dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this device!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                deviceService.remove(device._id)
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
