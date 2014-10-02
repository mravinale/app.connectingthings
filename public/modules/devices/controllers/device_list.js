'use strict';

angular.module('app')
    .controller('DeviceListCtrl', function ($scope, deviceService, ngTableParams, $modal, $log) {

        $scope.errors = {};

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
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

            deviceService.remove(device._id)
                .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }


        $scope.initDataTable();

    });
