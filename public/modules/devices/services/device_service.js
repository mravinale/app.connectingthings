'use strict';

angular.module('app').service('deviceService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            search: params.filter().searchFilter
        }

        return $http.get('/devices', { params : paramsToSend });
    };

    this.getAllDevices = function(){
        return $http.get('/devices/items');
    };

    this.getById = function(panelId){
        return $http.get('/devices/'+panelId);
    };

    this.getFullById = function(panelId){
        return $http.get('/devices/full/'+panelId);
    };

    this.create = function (device) {
        return $http.post('/devices', device);
    };

    this.remove = function (deviceId) {
        return $http.delete('/devices/'+deviceId);
    };

    this.update = function ( panel) {
        return $http.put('/devices/'+panel._id, panel);
    };
});