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
              var nonSelectedPanels = _.filter(response, function(panel){ return _.isUndefined(panel.sections) });
              if(_.isEmpty($scope.section.panels)){
                $scope.panels =  nonSelectedPanels;
              } else {
                var selectedSectionPanels = _.map($scope.section.panels, function(panelId){ return _.where(response, {_id: panelId})[0] });
                $scope.panels =  _.union(nonSelectedPanels, selectedSectionPanels);
              }

             // console.log( $scope.panels);
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
