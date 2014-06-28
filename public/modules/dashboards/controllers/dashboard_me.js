'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('DashboardMeCtrl', function ($scope, panelService, sectionService, $sessionStorage, dashboardService) {

        dashboardService.getDashboard()
            .success(function (response, status, headers, config) {
                $sessionStorage.dashboard = response.order;
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });


        sectionService.getAllSections()
            .success(function (response, status, headers, config) {
                $scope.sections = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.sortableConfig =  {
            stop: function(e, ui) {

                $sessionStorage.dashboard = $scope.sections.map(function(i){ return {name: i.name, panels: i.panels.map(function(p){return p._id;})}});
                
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
    return function(input,sectionName) {
        var out = [];
        if($sessionStorage.dashboard === undefined){
            out = input
        }
        else{
            _.each($sessionStorage.dashboard, function(section){
                 if(section.name == sectionName && input !== undefined){
                    _.each(section.panels, function(panelId){
                        out.push(_.find(input, function(panel){ return panelId  == panel._id; }));
                    });
                 }
            });
        }

        return out;
    };
})
