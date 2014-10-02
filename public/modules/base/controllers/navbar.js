'use strict';

angular.module('app').controller('NavbarCtrl', function ($scope,$rootScope,$sessionStorage, sessionService, $location) {

    $scope.logout = function() {
        sessionService.remove()
            .success(function (response, status) {
                console.log("Ok:",response);
            })
            .error(function(response, status) {
                console.log("Error:",response);
            })
            .finally(function() {
                $rootScope.currentUser = undefined;
                $sessionStorage.$reset();
                $location.path('/login');
                console.log(response);
            });

    };

});
