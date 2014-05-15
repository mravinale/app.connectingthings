'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelEditCtrl', function ($scope, $routeParams) {

        panelService.getById($routeParams.id)
            .success(function (response, status, headers, config) {
                $scope.panel = response.data 
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

    });
