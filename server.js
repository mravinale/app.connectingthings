'use strict';
if(process.argv[2] == '-dist') {
  require('newrelic');
}

// Module dependencies.
var express = require('express'),
    _ = require('underscore'),
    async = require('async'),
    http = require('http'),
    mqtt = require('mqtt'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(express),
    config = require('./api/config/config'),
    mongoose = require('mongoose'),
    ponte = require("ponte"),
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

    if(process.argv[2] == '-dist'){
        app.use(express.static(__dirname + '/dist'));
    } else {
       app.use(express.static(__dirname + '/public'));
    }
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



var opts = {
    logger: {
        level: 'info'
    },
    http: {
        port: 3001 // http
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
var User = mongoose.model('User');
var Trigger = mongoose.model('Trigger');
var triggerService = require('./api/services/triggerService');
// Start socket conection
var ponteServer = ponte(opts);

var tryParseJson = function(str) {
    try {
        return JSON.parse(str);
    } catch (ex) {
        return null;
    }
};

var lastValue = { topic: null, value: null, key: null };

ponteServer.on("updated", function(resource, buffer) {

    //console.log("Message received", resource, tryParseJson(buffer.toString()));

    var message = { topic: resource, body: tryParseJson(buffer.toString())}; //https://www.npmjs.com/package/jsonschema
    if(!message.body || !message.body.value || !message.body.key) return console.log("Wrong message format");

    message.topic = "/"  + message.body.key + message.topic;

    async.waterfall([
      function(callback) {
        User.findOne({ key : message.body.key },callback);
      },
      function(user, callback) {
        if(!user) return callback({message: "User not found for key: " + message.body.key}, null);

        //Set expiration messge and restrict interval between messages
        message.expireAt =  user.accountType == "Free"? moment().add(1, 'day').toDate() : moment().add(1, 'week').toDate();
        var ms = moment(moment.utc().format()).diff(moment(user.statistics.lastUpdate.toISOString()));
        if(moment.duration(ms).asSeconds() < 10 &&  user.accountType == "Free") return callback({message: "Message interval should be more than 10 seconds"}, null);
        triggerService.execute(user, message, callback);
      },
      function( user, callback) {
        io.sockets.emit(message.topic, message.body);
        user.statistics.messages++;
        user.statistics.lastUpdate = new Date();
        User.update({ _id : user._id }, { statistics: user.statistics }, callback);
      },
      function(result, callback) {
        if(lastValue.topic == resource && lastValue.value ==  message.body.value) return callback(null,null);

        var newMessage = new Message({ topic: resource, value: message.body.value, key: message.body.key, expireAt: message.expireAt});
        newMessage.save(callback);
      }
    ], function (err, message) {
      if (err) return console.error(err.code, err.message);

      if(message) {
        lastValue = message.toObject();
      }
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