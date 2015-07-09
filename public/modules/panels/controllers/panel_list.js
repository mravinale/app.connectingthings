'use strict';

angular.module('app')
    .controller('PanelListCtrl', function ($scope, panelService, ngTableParams, $modal, $log, psResponsive,$window) {

    $scope.errors = {};
    $scope.filters = {  searchFilter: '' };

    angular.element($window).on('resize', function () {
        $scope.tableParams.sizeFlag = psResponsive('> small');
        $scope.tableParams.typeFlag = psResponsive('> small');
    });

    $scope.initDataTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            },
            filter: $scope.filters
        }, {
            total: 0,           // length of data
            getData: function ($defer, params) {
                panelService.getAll(params).success(function (response, status, headers, config) {
                    params.total(response.count);
                    $defer.resolve(response.data);

                }).error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
            }
        });
        $scope.tableParams.sizeFlag = psResponsive('> small');
        $scope.tableParams.typeFlag = psResponsive('> small');
    };

    $scope.newPanel = function () {
        var modalInstance = $modal.open({
            templateUrl: 'panel_add',
            controller: 'PanelAddCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
        });
    };

    $scope.editPanel = function (panelId) {

        var modalInstance = $modal.open({
            templateUrl: 'panel_edit',
            controller: 'PanelEditCtrl',
            size: 'lg',
            resolve: {
                panelId: function () {
                    return panelId;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('editDashboard dismissed at: ' + new Date());
        });
    };

    $scope.delete = function (panel) {

        panelService.remove(panel._id)
        .success(function (response, status, headers, config) {
            $scope.tableParams.reload();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
            });
        });
    }

    $scope.initDataTable();

});
