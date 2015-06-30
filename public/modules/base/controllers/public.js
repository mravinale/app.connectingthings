'use strict';

angular.module('app')
    .controller('publicCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
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

            publicService.getAllDashboards($state.params.id) //iL4bJVGT820
                .success(function (response, status, headers, config) {
                    $scope.dashboards = response;
                    $scope.user = response? response[0].owner : null;
                    $scope.tab = response[0]? response[0].name : null;

                })
                .error(function(response, status, headers, config) {
                    $state.transitionTo('access.signin');
                });

    });

