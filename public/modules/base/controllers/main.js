'use strict';

angular.module('meanp')
    .controller('MainCtrl', function ($scope, webSocket) {
        $scope.gaugeValue = 0;

        var items = [];

        webSocket.subscribe(function (item) {
            items.push(item);

            if (items.length > 40) {
                items.shift();
            }

            $scope.chart = {
                data: items,
                max: 30
            };

            $scope.gaugeValue = item.value;
            $scope.$apply();
        });
    });
