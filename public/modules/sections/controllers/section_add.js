'use strict';

angular.module('app')
    .controller('SectionAddCtrl', function ($scope, sectionService,panelService, $location, $modalInstance) {

        $scope.section = { };

        $scope.save = function() {
            $scope.errors = {};

           sectionService.create($scope.section)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
                $scope.panels = response;
                console.log(response);

            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
