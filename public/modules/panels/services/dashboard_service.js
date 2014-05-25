'use strict';

/* Services */
angular.module('meanp').service('dashboardService', function ($http) {


    this.getDashboard = function(){
        return $http.get('/dashboard');
    };

    this.createDashboard = function (panel) {
        return $http.post('/dashboard', panel);
    };

});