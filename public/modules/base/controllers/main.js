'use strict';

angular.module('meanp')
    .controller('MainCtrl', function ($scope, socket) {
        $scope.gaugeValue = 0;

        var items = [];
        socket.on('temperature', function (item) {

            var temperature = angular.fromJson(item);
            temperature.timestamp = Date.now();

            console.log(temperature);
            items.push(temperature);

            if (items.length > 40)  items.shift();

            $scope.chart = { data: items, max: 30 };
            $scope.gaugeValue = temperature.value;
            $scope.$apply();
        });


    });
