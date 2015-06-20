'use strict';

angular.module('app')
    .controller('publicListCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

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

            publicService.getAllUsers()
              .success(function (response, status, headers, config) {
                  $scope.users = response;
                  $scope.devices = _.reduce(response, function(memo, user){ return memo + user.statistics.devices; }, 0);
                  $scope.messages = _.reduce(response, function(memo, user){ return memo + user.statistics.messages; }, 0);
                  $scope.sensors = _.reduce(response, function(memo, user){ return memo + user.statistics.sensors; }, 0);
              })
              .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });


    });

