'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelMeCtrl', function ($scope, panelService, $sessionStorage, dashboardService) {

        dashboardService.getDashboard()
            .success(function (response, status, headers, config) {
                $sessionStorage.dashboard = response.order;
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });


        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
              // $scope.panels = response;
                var groups = _.groupBy(response, function(panel){ return panel.section });
                $scope.sections = _.map(groups, function(array, key){ return {name:key, panels: array}; });
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.sortableConfig =  {
            stop: function(e, ui) {

                $sessionStorage.dashboard = $scope.sections.map(function(i){ return i._id; });
                console.log($sessionStorage.dashboard)
                dashboardService.createDashboard($sessionStorage.dashboard)
                    .success(function (response, status, headers, config) {
                        console.log(response);
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response);
                    });


            }
        };

    });

angular.module('meanp').filter('orderPanel', function($sessionStorage) {
    return function(input) {
        var out = [];

        if($sessionStorage.dashboard === undefined){
            out = input
        }
        else{
            _.each($sessionStorage.dashboard, function(panelId){
                if(input !== undefined)
                    out.push(_.find(input, function(panel){ return panelId  == panel._id; }));
            });
        }

        return out;
    };
})
