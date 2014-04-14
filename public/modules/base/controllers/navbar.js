'use strict';

angular.module('meanp').controller('NavbarCtrl', function ($scope,$rootScope,$localStorage, sessionService, $location) {

    $scope.logout = function() {
        sessionService.remove()
            .success(function (response, status) {
                delete $rootScope.currentUser;
                delete $localStorage.counter;
                $location.path('/login');
            })
            .error(function(response, status) {
                console.log(response);
            });

    };

});
