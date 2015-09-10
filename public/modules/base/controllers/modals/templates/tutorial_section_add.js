'use strict';

angular.module('app')
    .controller('TutorialSectionAddCtrl', function ($scope, $rootScope, sectionService,panelService) {

        $scope.section = { isPublic: true };

        $scope.save = function(form) {
            $scope.errors = {};

           sectionService.create($scope.section)
                .success(function (response, status, headers, config) {
                   $rootScope.$broadcast('reload-tableParams');
                   $scope.$nextStep();
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

    });
