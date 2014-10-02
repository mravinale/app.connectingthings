'use strict';

angular.module('app').service('cameraService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/cameras', { params : paramsToSend });
    };

    this.getAllCameras = function(){
        return $http.get('/cameras/items');
    };

    this.getById = function(panelId){
        return $http.get('/cameras/'+panelId);
    };

    this.getFullById = function(panelId){
        return $http.get('/cameras/full/'+panelId);
    };

    this.create = function (camera) {
        return $http.post('/cameras', camera);
    };

    this.remove = function (cameraId) {
        return $http.delete('/cameras/'+cameraId);
    };

    this.update = function ( panel) {
        return $http.put('/cameras/'+panel._id, panel);
    };
});