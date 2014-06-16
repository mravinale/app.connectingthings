'use strict';
angular.module('meanp')
    .controller('SectionEditCtrl', function ($scope, $routeParams, sectionService,$location) {

        sectionService.getById($routeParams.id)
            .success(function (response, status, headers, config) {
                $scope.section = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.submit = function(){
            $scope.errors = {};

            sectionService.update($scope.section)
                .success(function (response, status, headers, config) {
                    $location.path("/section/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }

    });
