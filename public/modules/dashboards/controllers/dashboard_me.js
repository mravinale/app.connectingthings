'use strict';
angular.module('app')
    .controller('MyDashboardCtrl', function ($scope, panelService, sectionService, $localStorage, dashboardService, $rootScope, $modal, $log, SweetAlert) {

        $scope.dashboards = [];
        $scope.items = [];
        $scope.tab = { name:null, id:null };
        $scope.dashStyle = {color:'rgba(0,0,0,.075)'};
        $scope.areOptionsEnabled = true;

        $scope.setTab = function(dashboard){
            $scope.tab.name = dashboard.name;
            $scope.tab.id = dashboard._id;
            $scope.init();
        };

        $scope.toggleView = function(){
            $scope.showOptions = !$scope.showOptions;
        };

        $scope.init = function(){

            dashboardService.getAllDashboards()
            .success(function (response, status, headers, config) {
                $scope.dashboards = response;

                _.each( $scope.dashboards, function(dashboard){
                    var items = _.union(dashboard.panels, dashboard.sections);
                    dashboard.items = items.length <= 0?  [{}] : items;
                });
                $scope.tab.name = $scope.tab.name? $scope.tab.name : response[0].name;
                $scope.tab.id = $scope.tab.id? $scope.tab.id : response[0]._id;
                $localStorage.currentDashboard = $scope.tab;

            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });
      };

        $rootScope.$on('reload-myDashboard', function(event, args) {
          $scope.init();
        });


        $scope.gridsterOpts = {
          minColumns: 1,
          swapping: false,
          avoid_overlapped_widgets:true,
          width: 'auto',
          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
          rowHeight: '80', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
          resizable: {
            enabled: true,
            start: function(event, uiWidget, $element) {},
            resize: function(event, uiWidget, $element) {},
            stop: function(event, uiWidget, $element) {}
          },
          draggable: {
            enabled: true, // whether dragging items is supported
            start: function(event, $element, widget) {}, // optional callback fired when drag is started,
            drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
            stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
          }

        };


      //var watcher = toggleWatch('dashboards', function(newitems, olditems){
        $scope.$watch('dashboards', function(newitems, olditems){


            var cleanedNewItems = angular.fromJson(angular.toJson(newitems));
            var cleanedOldItems = angular.fromJson(angular.toJson(olditems));

            var delta = jsondiffpatch.diff( cleanedNewItems,  cleanedOldItems);

            if(!delta || !_.values(delta)[0] || ! _.values(delta)[0].items ) return;

            var sections = _.where(cleanedNewItems,{name: $scope.tab.name})[0].sections;
            if(!sections) return;

            var sectionChanged = _.values(delta)[0].sections;
            var sectionChangedKey = parseInt(_.first(_.keys(sectionChanged)));

            if(sections[sectionChangedKey]) {
                sectionService.update(sections[sectionChangedKey])
                    .success(function(response, status, headers, config) {
                        $localStorage.myDashboards = $scope.dashboards;
                        //console.log(sections[sectionChangedKey]);
                    }).error(function(response, status, headers, config) {
                    console.log(response);
                });
            }

            var panels = _.where(cleanedNewItems,{name: $scope.tab.name})[0].panels;
            if(!panels) return;

            var panelChanged = _.values(delta)[0].panels;
            var panelChangedKey = parseInt(_.first(_.keys(panelChanged)));

            if(panels[panelChangedKey]) {
                panelService.update(panels[panelChangedKey])
                  .success(function(response, status, headers, config) {
                    $localStorage.myDashboards = $scope.dashboards;
                    //console.log(panels[panelChangedKey]);
                  }).error(function(response, status, headers, config) {
                    console.log(response);
                });
            }

      }, true);


        $scope.editDashboard = function(){
            var modalInstance = $modal.open({
                templateUrl: '../modules/dashboards/views/dashboard_edit.html',
                controller: 'DashboardEditCtrl',
                size: 'lg',
                resolve: {
                    dashboardId: function () {
                        return $scope.tab.id;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.init();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });

        };

        $scope.addDashboard = function(){
            var modalInstance = $modal.open({
                templateUrl: '../modules/dashboards/views/dashboard_add.html',
                controller: 'DashboardAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.init();
            }, function () {
                $log.info('addDashboard dismissed at: ' + new Date());
            });

        };

        $scope.addPanel = function () {
          var modalInstance = $modal.open({
            templateUrl: '../modules/panels/views/panel_add_container.html',
            controller: 'PanelAddContainerCtrl',
            size: 'lg'
          });

          modalInstance.result.then(function () {
            $scope.init();
          }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
          });
        };

      $scope.addSection = function () {
        var modalInstance = $modal.open({
          templateUrl: '../modules/sections/views/section_add.html',
          controller: 'SectionAddCtrl',
          size: 'lg'
        });

        modalInstance.result.then(function () {
          $scope.init();
        }, function () {
          $log.info('newSection dismissed at: ' + new Date());
        });
      };


      $scope.deleteDashboard = function(){
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this dashboard!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!"
          },
          function(isConfirm) {
            if (isConfirm) {

              dashboardService.remove($scope.tab.id)
                .success(function (response, status, headers, config) {
                  $scope.setTab($scope.dashboards[0]);
                  $scope.init();
                })
                .error(function (response, status, headers, config) {
                  $log.info('deleted dashboard dismissed at: ' + new Date());
                });
            }
          });

      };

       // watcher();
        $scope.init();

        /* TODO: realtime dashboard items update
         var toggleWatch = function(watchExpr, fn) {
            var watchFn;
            return function() {
                if (watchFn) {
                    watchFn();
                    watchFn = undefined;
                    console.log("Disabled " + watchExpr);
                } else {
                    watchFn = $scope.$watch(watchExpr, fn, true);
                    console.log("Enabled " + watchExpr);
                }
            };
         };


         socket.on('panel.update.completed', function (message) {
            console.log(message);
            testWatcher()
            $scope.init();

            console.log(findDeep( $scope.dashboards[0].sections[0], message._id ));
            $scope.dashboards[0].sections[0].panels = angular.fromJson(message);
            var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

            //testWatcher()
            $timeout(function(){
            testWatcher()
            }, 3000);
         });
         */

    });
