'use strict';

// Module dependencies.
var express = require('express'),
    http = require('http'),
    mqtt = require('mqtt'),
    sockjs  = require('sockjs'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(express),
    config = require('./api/config/config'),
    mosca = require('mosca');

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
    var gaugeValue = 50;
    setInterval(function broadcast() {
        gaugeValue += Math.random() * 40 - 20;
        gaugeValue = gaugeValue < 0 ? 0 : gaugeValue > 100 ? 100 : gaugeValue;
        var message = JSON.stringify({ value: Math.floor(gaugeValue) });

        mqttClient.publish('temperature', message);
    },2000);
});

var moscaServer = new mosca.Server({ port: 1883, backend:{
        type: 'mongo',
        url: config.db.mqtt,
        pubsubCollection: 'ascoltatori',
        mongo: {}
    }})
    .on('ready', function setup() {
        console.log('Mosca server is up and running')
    });

var mqttClient = mqtt.createClient(1883, 'localhost')
    .subscribe('temperature')
    .on('message', function (topic, message) {
        io.sockets.emit('temperature', message);
     //   console.log(message);
    });