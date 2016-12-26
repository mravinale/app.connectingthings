'use strict';

angular.module('app')
    .controller('publicListCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

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

            $scope.filterAccounts = function (user) {

              if($rootScope.currentUser &&  $rootScope.currentUser.email === 'mravinale@gmail.com'){
                return true;
              } else {
                return user.accountType !== 'Free';
              }

            };

            publicService.getAllUsers()
              .success(function (response, status, headers, config) {
                  //$scope.users = response;

                  if($rootScope.currentUser &&  $rootScope.currentUser.email === 'mravinale@gmail.com'){
                    $scope.users = response;
                  } else {
                    $scope.users = _.reject(response, function (user) {
                      return user.accountType == 'Free';
                    });
                  }

                  $scope.devices = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.devices; }, 0);
                  $scope.messages = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.messages; }, 0);
                  $scope.sensors = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.sensors; }, 0);
              })
              .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });


    });

