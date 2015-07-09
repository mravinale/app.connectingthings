'use strict';

angular.module('app')
    .controller('TriggerListCtrl', function ($scope, triggerService, ngTableParams, $modal, $log, psResponsive,$window) {

    $scope.errors = {};
    $scope.filters = {  searchFilter: '' };

    angular.element($window).on('resize', function () {
        $scope.tableParams.ruleFlag = psResponsive('> small');
        $scope.tableParams.valueFlag = psResponsive('> small');
        $scope.tableParams.descriptionFlag = psResponsive('> small');
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
                triggerService.getAll(params).success(function (response, status, headers, config) {
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
        $scope.tableParams.ruleFlag = psResponsive('> small');
        $scope.tableParams.valueFlag = psResponsive('> small');
        $scope.tableParams.descriptionFlag = psResponsive('> small');
    };

    $scope.newTrigger = function () {
        var modalInstance = $modal.open({
            templateUrl: 'trigger_add',
            controller: 'TriggerAddCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
        });
    };

    $scope.editTrigger = function (triggerId) {

        var modalInstance = $modal.open({
            templateUrl: 'trigger_edit',
            controller: 'TriggerEditCtrl',
            size: 'lg',
            resolve: {
                triggerId: function () {
                    return triggerId;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('editDashboard dismissed at: ' + new Date());
        });
    };

    $scope.delete = function (trigger) {

        triggerService.remove(trigger._id)
        .success(function (response, status, headers, config) {
            $scope.tableParams.reload();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
            });
        });
    };

    $scope.initDataTable();

});
