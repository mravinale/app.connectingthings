'use strict';

angular.module('app')
    .controller('publicCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

            $scope.dashboards = [];
            $scope.tab = { name:null, id:null };
            $scope.areOptionsEnabled = false;

            $scope.setTab = function(dashboard){
              $scope.tab.name = dashboard.name;
              $scope.tab.id = dashboard._id;
              $scope.init();
            };

            $rootScope.showHeader = false;
            $rootScope.app.settings.asideFolded = true;

            $scope.$on("$destroy", function(){
              $rootScope.showHeader = true;
              $rootScope.app.settings.asideFolded = false;
              $rootScope.noMenuStyle =  {}
            });

            if(psResponsive('< small')){
                $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
            } else{
                $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
            }

            angular.element($window).on('resize', function () {
                if(psResponsive('< small')){
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
                } else{
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
                }

            });

            $scope.gridsterOpts = {
              minColumns: 1,
              swapping: false,
              avoid_overlapped_widgets:true,
              width: 'auto',
              colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
              rowHeight: '80', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
              resizable: {
                enabled: false,
                start: function(event, uiWidget, $element) {},
                resize: function(event, uiWidget, $element) {},
                stop: function(event, uiWidget, $element) {}
              },
              draggable: {
                enabled: false, // whether dragging items is supported
                start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
              }

            };

            $scope.init = function() {

                publicService.getAllDashboards($state.params.id) //iL4bJVGT820
                    .success(function (response, status, headers, config) {
                        $scope.dashboards = response;
                        if (!response || !response[0] ) return;

                        $scope.user = response[0].owner ? response[0].owner : null;
                        if ($rootScope.currentUser &&  $rootScope.currentUser.email !== 'mravinale@gmail.com' && (!$scope.user || $scope.user.accountType == 'Free')) return;

                        _.each( $scope.dashboards, function(dashboard){
                          var items = _.union(dashboard.panels, dashboard.sections);
                          dashboard.items = items.length <= 0?  [{}] : items;
                        });

                        $scope.tab.name = $scope.tab.name? $scope.tab.name : response[0].name;
                        $scope.tab.id = $scope.tab.id? $scope.tab.id : response[0]._id;
                        $localStorage.currentDashboard = $scope.tab;


                    })
                    .error(function (response, status, headers, config) {
                        $state.transitionTo('access.signin');
                    });
            };

            $scope.init();
    });

