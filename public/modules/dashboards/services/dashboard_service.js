'use strict';

/* Services */
angular.module('meanp').service('dashboardService', function ($http) {


    this.getMyDashboard = function(){
        return $http.get('/mydashboard');
    };

    this.createMyDashboard = function (dashboardsChanges) {
        return $http.post('/mydashboard', dashboardsChanges);
    };


    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/dashboards', { params : paramsToSend });
    };

    this.getAllDashboards = function(){
        return $http.get('/dashboards/items');
    };

    this.getById = function(dashboardId){
        return $http.get('/dashboards/'+dashboardId);
    };

    this.getFullById = function(dashboardId){
        return $http.get('/dashboards/full/'+dashboardId);
    };

    this.create = function (dashboard) {
        return $http.post('/dashboards', dashboard);
    };

    this.remove = function (dashboardId) {
        return $http.delete('/dashboards/'+dashboardId);
    };

    this.update = function ( dashboard) {
        return $http.put('/dashboards/'+dashboard._id, dashboard);
    };
});