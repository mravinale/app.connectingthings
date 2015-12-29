'use strict';

angular.module('app')
    .factory('socket', function (socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect("http://localhost:3000")
        });
});