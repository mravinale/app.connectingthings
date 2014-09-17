'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelEditCtrl', function ($scope, $routeParams, panelService, deviceService, $location, $modalInstance , panelId) {

    $scope.panel = { };

    panelService.getById(panelId)
    .success(function (response, status, headers, config) {
        $scope.panel = response
    }).error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
        });
    });

    deviceService.getAllDevices()
    .success(function (response, status, headers, config) {
        $scope.devices = response;
    }).error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
        });
    });

    $scope.save = function () {
        $scope.errors = {};

        panelService.update($scope.panel)
        .success(function (response, status, headers, config) {
            $modalInstance.close();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
            });
        });
    };

    $scope.$watch('panel.device', function (deviceId) {

        deviceService.getFullById(deviceId)
        .success(function (response, status, headers, config) {
            $scope.sensors = response.sensors;
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
            });
        });
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
