'use strict';

angular.module('app')
    .controller('DashboardAddCtrl', function ($scope, dashboardService, panelService, sectionService, $location, $modalInstance) {

    $scope.dashboard = {  };


    $scope.save = function (form) {
        $scope.errors = {};

        dashboardService.create($scope.dashboard)
        .success(function (response, status, headers, config) {
            $modalInstance.close();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });

    };

    panelService.getAllPanels() //TODO: use backedn filtering
        .success(function (response, status, headers, config) {

            var nonSelectedPanels = _.filter(response, function(panel){ return _.isUndefined(panel.dashboard) });
            if(_.isEmpty($scope.dashboard.panels)){
                $scope.panels =  nonSelectedPanels;
            } else {
                var selectedDashboardPanels = _.map($scope.dashboard.panels, function(panelId){ return _.where(response, {_id: panelId})[0] });
                $scope.panels =  _.union(nonSelectedPanels, selectedDashboardPanels);
            }
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });


    sectionService.getAllSections()//TODO: use backedn filtering
        .success(function (response, status, headers, config) {
            var nonSelectedSections = _.filter(response, function(section){ return _.isUndefined(section.dashboard) });
            if(_.isEmpty($scope.dashboard.sections)){
                $scope.sections =  nonSelectedSections;
            } else {
                var selectedDashboardSections = _.map($scope.dashboard.sections, function(sectionId){ return _.where(response, {_id: sectionId})[0] });
                $scope.sections =  _.union(nonSelectedSections, selectedDashboardSections);
            }
            
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
