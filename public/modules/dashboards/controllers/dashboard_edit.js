'use strict';
angular.module('app')
    .controller('DashboardEditCtrl', function ($scope, $routeParams, dashboardService, panelService, $location, $modalInstance, dashboardId) {

        $scope.dashboard = { };

        dashboardService.getById(dashboardId)
            .success(function (response, status, headers, config) {
                $scope.dashboard = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            dashboardService.update($scope.dashboard)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
                var nonSelectedPanels = _.filter(response, function(panel){ return _.isUndefined(panel.dashboards) });
                if(_.isEmpty($scope.dashboard.panels)){
                    $scope.panels =  nonSelectedPanels;
                } else {
                    var selectedDashboardPanels = _.map($scope.dashboard.panels, function(panelId){ return _.where(response, {_id: panelId})[0] });
                    $scope.panels =  _.union(nonSelectedPanels, selectedDashboardPanels);
                }

                // console.log( $scope.panels);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
