'use strict';

angular.module('meanp').service('deviceService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
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

    this.create = function (camera) {
        return $http.post('/devices', camera);
    };

    this.remove = function (deviceId) {
        return $http.delete('/devices/'+deviceId);
    };

    this.update = function ( panel) {
        return $http.put('/devices/'+panel._id, panel);
    };
});