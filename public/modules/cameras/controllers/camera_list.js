'use strict';

angular.module('app')
    .controller('CameraListCtrl', function ($scope, cameraService, ngTableParams, $modal, $log) {

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
                    cameraService.getAll(params)
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

        $scope.newCamera = function () {
            var modalInstance = $modal.open({
                templateUrl: 'camera_add',
                controller: 'CameraAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDashboard dismissed at: ' + new Date());
            });
        };

        $scope.editCamera = function (cameraId) {

            var modalInstance = $modal.open({
                templateUrl: 'camera_edit',
                controller: 'CameraEditCtrl',
                size: 'lg',
                resolve: {
                    cameraId: function () {
                        return cameraId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });
        };


        $scope.delete =  function(camera){

            cameraService.remove(camera._id)
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