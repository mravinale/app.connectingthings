'use strict';

angular.module('meanp')
    .factory('socket', function (socketFactory) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect('http://localhost')
        });
})
