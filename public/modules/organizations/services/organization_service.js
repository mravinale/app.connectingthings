'use strict';

angular.module('app').service('organizationService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        };

        return $http.get('/organizations', { params : paramsToSend });
    };

    this.getAllOrganizations = function(){
        return $http.get('/organizations/items');
    };

    this.getById = function(organizationId){
        return $http.get('/organizations/'+organizationId);
    };

    this.create = function (organization) {
        return $http.post('/organizations', organization);
    };

    this.remove = function (organizationId) {
        return $http.delete('/organizations/'+organizationId);
    };

    this.update = function ( organization) {
        return $http.put('/organizations/'+organization._id, organization);
    };
});