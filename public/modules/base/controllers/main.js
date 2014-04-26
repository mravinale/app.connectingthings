'use strict';

angular.module('meanp')
    .controller('MainCtrl', function ($scope, socket) {

        $scope.tempGaugeValue = 0;
        $scope.humidityGaugeValue = 0;

        var tempItems = [{value: 0, timestamp: Date.now()} ];
        $scope.tempChart = { data: tempItems, max: 30 };

        var humidityItems = [{value: 0, timestamp: Date.now()} ];
        $scope.humidityChart = { data: humidityItems, max: 30 };

        socket.on('temperature', function (temp) {

            var item = angular.fromJson(temp);
            item.timestamp = Date.now();

            tempItems.push(item);
            if (tempItems.length > 30)  tempItems.shift();

            $scope.tempChart = { data: tempItems, max: 30 };
            $scope.tempGaugeValue = item.value;

            console.log(item);
            $scope.$apply();
        });

        socket.on('humidity', function (hum) {

            var item = angular.fromJson(hum);
            item.timestamp = Date.now();

            humidityItems.push(item);
            if (humidityItems.length > 30)  humidityItems.shift();

            $scope.humidityChart = { data: humidityItems, max: 30 };
            $scope.humidityGaugeValue = item.value;

            console.log(item);
            $scope.$apply();
        });


    });
