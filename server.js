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
    config = require('./api/config/config');

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
    secret: 'MEANP', store: new mongoStore({ url: config.db, collection: 'sessions' })
}));

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
app.use(app.router);
require('./api/config/routes')(app);


var clients = {};
var clientCount = 0;
var interval;

var gaugeValue = 50;

function broadcast() {
    gaugeValue += Math.random() * 40 - 20;
    gaugeValue = gaugeValue < 0 ? 0 : gaugeValue > 100 ? 100 : gaugeValue;

    var message = JSON.stringify({ value: Math.floor(gaugeValue), timestamp: Date.now() });

    mqttClient.publish('temperature', message);
}

function startBroadcast () {
    interval = setInterval(broadcast, 2000);
    //broadcast();
}

var sockjsServer = sockjs.createServer();

sockjsServer.on('connection', function(conn) {
    console.log(" [.] open event received");
    var t = setInterval(function(){
        try{
            conn._session.recv.didClose();
        } catch (x) {}
    }, 15000);

    clientCount++;
    if (clientCount === 1) {
        startBroadcast();
    }

    clients[conn.id] = conn;

    conn.on('close', function() {
        clientCount--;
        delete clients[conn.id];
        if (clientCount === 0) {
            clearInterval(interval);
            mqttClient.end();
        }
        console.log(" [.] close event received");
        clearInterval(t);
        t = null;

    });
});


// Start server
var port = process.env.PORT || 3000;
var server= app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});


sockjsServer.installHandlers(server, { prefix: '/sockjs' });

var mosca = require('mosca')

var ascoltatore = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
    port: 1883,
    backend: ascoltatore
};

var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

// fired when a message is published
server.on('published', function(packet, client) {
  //  console.log('Published', packet.payload);
});




var mqttClient = mqtt.createClient(1883, 'localhost')
    .subscribe('temperature')
    .on('message', function (topic, message) {

        for (var key in clients) {
            if(clients.hasOwnProperty(key)) {
                clients[key].write(message);
            }
        }
       // console.log(message);
    });