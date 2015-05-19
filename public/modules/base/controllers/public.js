'use strict';

angular.module('app')
    .controller('publicCtrl', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route) {

            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
            };

            publicService.getAllDashboards($state.params.id) //iL4bJVGT820
                .success(function (response, status, headers, config) {
                    $scope.dashboards = response;
                    $rootScope.currentUser = response[0]? $scope.dashboards[0].owner : null;
                    $scope.tab = response[0]? response[0].name : null;
                })
                .error(function(response, status, headers, config) {
                    $state.transitionTo('access.signin');
                });

    });

