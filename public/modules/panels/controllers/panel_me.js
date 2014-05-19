'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelMeCtrl', function ($scope, panelService) {

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
