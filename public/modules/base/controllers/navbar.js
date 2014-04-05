'use strict';

angular.module('meanp').controller('NavbarCtrl', function ($scope,$rootScope, sessionService, $location) {
    $scope.menu = [{
      "title": "Blogs",
      "link": "blogs"
    }];

    $scope.authMenu = [{
      "title": "Create New Blog",
      "link": "blogs/create"
    }];

    $scope.logout = function() {
        sessionService.remove()
            .success(function (response, status) {
                $rootScope.currentUser = null;
                $location.path('/login');
            })
            .error(function(response, status) {
                console.log(response);
            });

    };

});
