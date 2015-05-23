'use strict';

angular.module('app')
    .controller('DashboardListCtrl', function ($scope, dashboardService, ngTableParams, $modal, $log, psResponsive,$window) {

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
                    dashboardService.getAll(params)
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

        $scope.newDashboard = function () {
            var modalInstance = $modal.open({
                templateUrl: 'dashboard_add',
                controller: 'DashboardAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDashboard dismissed at: ' + new Date());
            });
        };

        $scope.editDashboard = function (dashboardId) {

            var modalInstance = $modal.open({
                templateUrl: 'dashboard_edit',
                controller: 'DashboardEditCtrl',
                size: 'lg',
                resolve: {
                    dashboardId: function () {
                        return dashboardId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(dashboard){

            dashboardService.remove(dashboard._id)
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
