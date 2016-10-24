'use strict';
angular.module('app')
    .controller('DashboardEditCtrl', function ($scope, $routeParams, dashboardService, sectionService, panelService, $location, $modalInstance, dashboardId) {

        $scope.dashboard = { addedPanels:[],removedPanels:[], addedSections:[], removedSections:[] };
        var originalPanels = [];
        var originalSections = [];


        dashboardService.getById(dashboardId)
            .success(function (response, status, headers, config) {
                $scope.dashboard = _.extend(response, $scope.dashboard);
                originalPanels = angular.copy($scope.dashboard.panels);
                originalSections = angular.copy($scope.dashboard.panels)
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            $scope.dashboard.addedPanels = _.filter($scope.dashboard.panels, function(panel){ return !(_.contains(originalSections, panel));});
            $scope.dashboard.removedPanels = _.filter(originalPanels, function(panel){ return !(_.contains($scope.dashboard.panels, panel));});

            $scope.dashboard.addedSections = _.filter($scope.dashboard.sections, function(section){ return !(_.contains(originalSections, section));});
            $scope.dashboard.removedSections = _.filter(originalSections, function(section){ return !(_.contains($scope.dashboard.panels, section));});

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

        sectionService.getAllSections()
            .success(function (response, status, headers, config) {

                $scope.sections =  response;
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
