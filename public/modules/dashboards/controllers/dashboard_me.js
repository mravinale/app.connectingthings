'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('MyDashboardCtrl', function ($scope, panelService, sectionService, $localStorage, dashboardService, $rootScope,socket,$timeout) {


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



   //   socket.on('panel.update.completed', function (message) {
   //     console.log(message);
     //   testWatcher()
     ///   $scope.init();

    //   console.log(findDeep( $scope.dashboards[0].sections[0], message._id ));
    //    $scope.dashboards[0].sections[0].panels = angular.fromJson(message);
    //    var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

       // testWatcher()
    /*    $timeout(function(){
          testWatcher()
        }, 3000);*/
  //    });


        $rootScope.$on('reload-myDashboard', function(event, args) {
          $scope.init();
        });

        $scope.gridsterOpts = {
          minColumns: 1,
          swapping: true,
          avoid_overlapped_widgets:true,
          width: 'auto',
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
/*
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
*/
      //var watcher = toggleWatch('dashboards', function(newitems, olditems){
        $scope.watch('dashboards', function(newitems, olditems){


        var cleanedNewItems = angular.fromJson(angular.toJson(newitems));
        var cleanedOldItems = angular.fromJson(angular.toJson(olditems));

        var delta = jsondiffpatch.diff( cleanedNewItems,  cleanedOldItems);

      //  console.log("delta",delta);
        if(!delta || !_.first(delta) || ! _.first(delta).sections || !_.first(_.first(delta).sections).panels) return;

        var sections = _.first(cleanedNewItems).sections;
        var panels = _.first(_.first(cleanedNewItems).sections).panels;

        if(!sections || !panels) return;
/*
        var dashboardChanged =  _.first(delta);
        var dashboardChangeKey = parseInt(_.first(_.keys(dashboardChanged)));

        var sectionChanged =  _.first(delta).sections;
        var sectionChangedKey = parseInt(_.first(_.keys(sectionChanged)));
*/
        var panelChanged = _.first(_.first(delta).sections).panels;
        var panelChangeKey = parseInt(_.first(_.keys(panelChanged)));

        if(!panels[panelChangeKey]) return;

        panelService.update(panels[panelChangeKey])
          .success(function(response, status, headers, config) {
            console.log(panels[panelChangeKey]);
          }).error(function(response, status, headers, config) {
            console.log(response);
        });

      });

     // watcher();
      $scope.init();

    });
