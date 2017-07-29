'use strict';

angular.module('app')
    .factory('socket', function (socketFactory,baseUrl) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect(baseUrl)
        });
        //ioSocket: io.connect(window.location.protocol+"//"+window.location.host)
});