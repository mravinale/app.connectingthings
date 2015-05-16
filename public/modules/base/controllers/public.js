'use strict';

angular.module('app')
    .controller('publicCtrl', function ($scope, panelService, sectionService, $localStorage, publicService, $routeParams) {

            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
            };

            publicService.getAllDashboards($routeParams.key) //iL4bJVGT820
                .success(function (response, status, headers, config) {
                    $scope.dashboards = response;
                    $scope.tab = response[0]? response[0].name : null;
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

    });

