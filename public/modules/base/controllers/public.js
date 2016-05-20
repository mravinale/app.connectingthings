'use strict';

angular.module('app')
    .controller('publicCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {


            $scope.gridsterOpts = {
                minColumns: 1,
                swapping: false,
                avoid_overlapped_widgets:true,
                width: 'auto',
                colWidth: 'auto',
                rowHeight: '280',
                resizable: {
                    enabled: false
                },
                draggable: {
                    enabled: false
                }
            };

            $scope.dashboards = [];
            $scope.tab = null;

            $scope.setTab = function(id){

                $scope.tab = id;
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
        $scope.init = function() {
            _.each($scope.dashboards, function (dashboard) {
                dashboard.sections.length = 0
            });
            publicService.getAllDashboards($state.params.id) //iL4bJVGT820
                .success(function (response, status, headers, config) {
                    if (!response || !response[0]) return;

                    $scope.dashboards = _.each(response, function (dashboard) {
                        dashboard.sections = _.reject(dashboard.sections, function (section) {
                            if (!section.isPublic) return true;

                            section.panels = _.reject(section.panels, function (panel) {
                                return panel.isPublic == false;
                            });
                        });
                    });


                    $scope.user = response[0].owner ? response[0].owner : null;
                    $scope.tab = $scope.tab? $scope.tab : response[0].name;

                })
                .error(function (response, status, headers, config) {
                    $state.transitionTo('access.signin');
                });
        };

        $scope.init();
    });

