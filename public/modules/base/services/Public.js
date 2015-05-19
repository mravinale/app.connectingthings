'use strict';

/* Services */
angular.module('app').service('publicService', function ($http) {

    this.getAllDashboards = function(id){
        return $http.get('/public/dashboards/user/'+id);
    };

});