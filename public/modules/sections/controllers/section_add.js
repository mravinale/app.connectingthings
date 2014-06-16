'use strict';

angular.module('meanp')
    .controller('SectionAddCtrl', function ($scope, sectionService,$location) {

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

    });
