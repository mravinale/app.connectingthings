'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelAddCtrl', function ($scope, panelService, deviceService, $location) {

        $scope.submit = function() {
            $scope.errors = {};

            panelService.create($scope.panel)
                .success(function (response, status, headers, config) {
                    $location.path("/panel/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

        $scope.$watch('panel.device', function(deviceId) {

            deviceService.getFullById(deviceId)
                .success(function (response, status, headers, config) {
                    $scope.sensors = response.sensors;
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        });

        deviceService.getAllDevices()
            .success(function (response, status, headers, config) {
                $scope.devices = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

    });
