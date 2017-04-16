'use strict';
angular.module('app')
    .controller('UserSettingsCtrl', function ($scope, $rootScope, md5Helper, $routeParams, userService, $localStorage, $modalInstance, userId, organizationService) {

        $scope.user = { };


        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response;
                $scope.user.hash = md5Helper.createHash($scope.user.email);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.username = $scope.user.username;
                    $rootScope.iftt = $scope.user.iftt;
                    $rootScope.publicAvatar = "https://avatars.io/"+$scope.user.publicAvatar;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        organizationService.getAllOrganizations()
            .success(function (response, status, headers, config) {
                $scope.organizations = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
