'use strict';

/* Services */
angular.module('app').service('sessionService', function ($http) {

    this.create = function (user) {
        return $http.post('/auth/session/user', user);
    };

    this.remove = function () {
        return $http.delete('/auth/session/');
    };

    this.getCurrentUser = function () {
        return $http.delete('/auth/session/');
    };
});