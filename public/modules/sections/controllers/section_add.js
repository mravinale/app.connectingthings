'use strict';

angular.module('app')
    .controller('SectionAddCtrl', function ($scope, sectionService,panelService,$location) {

        $scope.submit = function() {
            $scope.errors = {};

           sectionService.create($scope.section)
                .success(function (response, status, headers, config) {
                    $location.path("/section/list");
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



    });
