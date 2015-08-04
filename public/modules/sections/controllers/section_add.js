'use strict';

angular.module('app')
    .controller('SectionAddCtrl', function ($scope, sectionService,panelService, $location, $modalInstance) {

        $scope.section = { isPublic: true };

        $scope.save = function(form) {
            $scope.errors = {};

           sectionService.create($scope.section)
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
                $scope.panels = response;
                console.log(response);

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
