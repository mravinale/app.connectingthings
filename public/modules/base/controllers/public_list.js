'use strict';

angular.module('app')
    .controller('publicListCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, userService, publicService, $routeParams, $state, $route, psResponsive, $window) {

            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
            };

						$rootScope.showHeader = false;
            $rootScope.app.settings.asideFolded = true;

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

            userService.getAllUsers()
              .success(function (response, status, headers, config) {
                  $scope.users = response;
              })
              .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });


    });

