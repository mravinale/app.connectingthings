'use strict';

// Module dependencies.
var express = require('express'),
    http = require('http'),
    mqtt = require('mqtt'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(express),
    config = require('./api/config/config'),
    mongoose = require('mongoose'),
    moment = require('moment');


var app = express();

    // Connect to database
var db = require('./api/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'api/models');
fs.readdirSync(modelsPath).forEach( function (file) { require(modelsPath + '/' + file); });

var pass = require('./api/config/passport');

// Environments configuration
app.configure( function(){
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public'));
});

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

// express/mongo session storage
app.use(express.session({
    secret: 'MEANP', store: new mongoStore({ url: config.db.default, collection: 'sessions' })
}));

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
app.use(app.router);
require('./api/config/routes')(app);


// Start server
var port = process.env.PORT || 3000;
var server= app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});


//Start socket conection
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    // mqttClient.publish('temperature', message);
});


var ponte = require("ponte");
var opts = {
    logger: {
        level: 'info'
    },
    http: {
        port: 3001 // tcp
    },
    mqtt: {
        port: 1883 // tcp
    },
    coap: {
        port: 1884 // udp
    },
    persistence: {
        type: 'mongo',
        url: config.db.mqtt
    },
    broker: {
        type: 'mongo',
        url: config.db.mqtt
    }
};

var Message = mongoose.model('Message');
// Start socket conection
var ponteServer = ponte(opts);
var lastValue = { topic:null, message:null }
ponteServer.on("updated", function(resource, buffer) {
    var message = { topic: resource, message: buffer.toString() };

    io.sockets.emit(message.topic, message.message);

    if(lastValue.topic == message.topic && lastValue.message ==  message.message) return; //add configuration
    //TODO: we should validate format
    var newMessage = new Message(message);
    newMessage.save(function(err, item) {
        if (err) { return console.error(err.code, err.message); }

        lastValue = item;
        console.log("Resource Updated", item.topic, JSON.parse(item.message));
    });

});



/*
var mqttClient = mqtt.createClient(1883, 'localhost')
    .subscribe('temperature')
    .subscribe('humidity')
    .subscribe('smoke')
    .subscribe('relay')
    .on('message', function (topic, message) {
        console.log("mqtt client:",message);
    });
*/