'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelAddCtrl', function ($scope, panelService) {

        $scope.register = function(form) {
            $scope.errors = {};

            panelService.create($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser = response;
                    $location.path('/');
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

    });
