'use strict';

/* Services */
angular.module('app').service('sessionService', function ($http) {

    this.confirmUser = function (id) {
        return $http.put('/auth/session/confirm/'+id);
    };

    this.create = function (user) {
        return $http.post('/auth/session/user', user);
    };

    this.login = function (provider,user) {
        return $http.post('/auth/session', {
            provider: provider,
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
        });
    };

    this.remove = function () {
        return $http.delete('/auth/session/');
    };

    this.getCurrentUser = function () {
        return $http.delete('/auth/session/');
    };
});