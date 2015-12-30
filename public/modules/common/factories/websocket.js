'use strict';

angular.module('app')
    .factory('socket', function (socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect(window.location.protocol+"//"+window.location.host)
        });
});