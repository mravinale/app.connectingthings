'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('MyDashboardCtrl', function ($scope, panelService, sectionService, $localStorage, dashboardService, $rootScope) {

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

        $scope.gridsterOpts = {

          avoid_overlapped_widgets:true,
          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
          rowHeight: '280', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
          resizable: {
            enabled: true,
            start: function(event, uiWidget, $element) {window.dispatchEvent(new Event('resize'));}, // optional callback fired when resize is started,
            resize: function(event, uiWidget, $element) {window.dispatchEvent(new Event('resize'));}, // optional callback fired when item is resized,
            stop: function(event, uiWidget, $element) {window.dispatchEvent(new Event('resize')); } // optional callback fired when item is finished resizing
          },
          draggable: {
            enabled: true, // whether dragging items is supported
            start: function(event, $element, widget) {}, // optional callback fired when drag is started,
            drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
            stop: function(event, $element, widget) { } // optional callback fired when item is finished dragging
          }

        };


        $scope.init();

    });
