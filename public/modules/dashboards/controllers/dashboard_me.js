'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('MyDashboardCtrl', function ($scope, panelService, sectionService, $sessionStorage, dashboardService) {

        dashboardService.getMyDashboard()
            .success(function (response, status, headers, config) {
                $sessionStorage.myDashboards = response;
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });

        dashboardService.getAllDashboards()
            .success(function (response, status, headers, config) {
                $scope.dashboards = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.updatePanels = function(){

            var dashboardsChanges = [];
            angular.forEach($scope.dashboards, function(dashboard, index) {
                var sections = dashboard.sections.map(function(i){ return {name: i.name, panels: i.panels.map(function(p){return p._id;})}});
                dashboardsChanges.push({sections: sections, dashboard:dashboard._id});
            });

            dashboardService.createMyDashboard(dashboardsChanges)
                .success(function (response) {
                    $sessionStorage.myDashboards = response;
                })
                .error(function(response) {
                    console.log(response);
                });
        };

        $scope.sortableConfig =  {
            stop: function(e, ui) { $scope.updatePanels(); }
        };

    });

angular.module('meanp').filter('orderPanel', function($sessionStorage) {
    return function(input, sectionName, dashboardId) {
        var out = [];

        if($sessionStorage.myDashboards.length == 0 ){
            out = input
        }
        else{
            var dashboard = _.find($sessionStorage.myDashboards, function(order){ return order.dashboard == dashboardId; });

            _.each(dashboard.sections, function(section){
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
