'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('MyDashboardCtrl', function ($scope, panelService, sectionService, $localStorage, dashboardService, $rootScope) {
/*
        dashboardService.getMyDashboard()
            .success(function (response, status, headers, config) {
                $localStorage.myDashboards = response;
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });
*/
        $scope.init = function(){
            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
            };

            dashboardService.getAllDashboards()
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
      };

        $scope.updatePanels = function(){

            var dashboardsChanges = [];
            angular.forEach($scope.dashboards, function(dashboard, index) {
                var sections = dashboard.sections.map(function(i){ return {name: i.name, panels: i.panels.map(function(p){return p._id;})}});
                dashboardsChanges.push({sections: sections, dashboard:dashboard._id});
            });

            dashboardService.createMyDashboard(dashboardsChanges)
                .success(function (response) {
                    $localStorage.myDashboards = response;
                })
                .error(function(response) {
                    console.log(response);
                });
        };

        $rootScope.$on('reload-myDashboard', function(event, args) {
          $scope.init();
        });

        $scope.sortableConfig =  {
            stop: function(e, ui) {
             //   $scope.updatePanels();
            }
        };

        $scope.init();

    });

//TODO: sections should be another kind of panel ;)
angular.module('app').filter('orderPanel', function($localStorage) {
    return function(input, sectionName, dashboardId) {
        var out = [];
/*
        if($localStorage.myDashboards.length == 0 ){
            out = input
        }
        else{
            var dashboard = _.find($localStorage.myDashboards, function(order){ return order.dashboard == dashboardId; });

            _.each(dashboard.sections, function(section){
                 if(section.name == sectionName && input !== undefined){
                    _.each(section.panels, function(panelId){
                        out.push(_.find(input, function(panel){ return panelId  == panel._id; }));
                    });
                 }
            });
        }
*/
        return input;
    };
})
