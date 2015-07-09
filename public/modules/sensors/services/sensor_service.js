'use strict';

angular.module('app').service('sensorService', function ($http) {

    this.getAll = function(params) {
      var paramsToSend ={
        page: params.page() -1,
        count: params.count(),
        orderBy: params.sorting(),
        search: params.filter().searchFilter
      };

        return $http.get('/sensors', { params : paramsToSend });
    };

    this.getAllSensors = function(){
        return $http.get('/sensors/items');
    };

    this.getById = function(sensorId){
        return $http.get('/sensors/'+sensorId);
    };

    this.create = function (sensor) {
        return $http.post('/sensors', sensor);
    };

    this.remove = function (sensorId) {
        return $http.delete('/sensors/'+sensorId);
    };

    this.update = function ( sensor) {
        return $http.put('/sensors/'+sensor._id, sensor);
    };
});