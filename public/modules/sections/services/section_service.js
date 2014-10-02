'use strict';

angular.module('app').service('sectionService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/sections', { params : paramsToSend });
    };

    this.getAllSections = function(){
        return $http.get('/sections/items');
    };

    this.getById = function(sectionId){
        return $http.get('/sections/'+sectionId);
    };

    this.create = function (section) {
        return $http.post('/sections', section);
    };

    this.remove = function (sectionId) {
        return $http.delete('/sections/'+sectionId);
    };

    this.update = function ( section) {
        return $http.put('/sections/'+section._id, section);
    };
});