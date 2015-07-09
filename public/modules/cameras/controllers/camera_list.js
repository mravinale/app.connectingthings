'use strict';

angular.module('app')
    .controller('CameraListCtrl', function ($scope, cameraService, ngTableParams, $modal, $log, psResponsive,$window) {

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
            $scope.tableParams.descriptionFlag = psResponsive('> small');
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
