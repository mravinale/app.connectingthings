'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelAddCtrl', function ($scope, panelService,$location) {

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

    });
