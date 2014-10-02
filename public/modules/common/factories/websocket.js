'use strict';

angular.module('app')
    .factory('socket', function (socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect("http://"+window.location.hostname)
        });
});