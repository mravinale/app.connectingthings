'use strict';

angular.module('app')
    .controller('SensorListCtrl', function ($scope, sensorService, ngTableParams, $modal, $log, psResponsive,$window) {

        $scope.errors = {};

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

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
                    sensorService.getAll(params)
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
            $scope.tableParams.tagFlag = psResponsive('> small');
        };

        $scope.newSensor = function () {
            var modalInstance = $modal.open({
                templateUrl: 'sensor_add',
                controller: 'SensorAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new sensor dismissed at: ' + new Date());
            });
        };

        $scope.editSensor = function (sensorId) {

            var modalInstance = $modal.open({
                templateUrl: 'sensor_edit',
                controller: 'SensorEditCtrl',
                size: 'lg',
                resolve: {
                    sensorId: function () {
                        return sensorId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit sensor dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

            sensorService.remove(device._id)
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
