'use strict';
if(process.env.NODE_ENV == 'prod') {
  require('newrelic');
}

// Module dependencies.
var express = require('express'),
    _ = require('underscore'),
    async = require('async'),
    http = require('http'),
    https = require('https'),
    mqtt = require('mqtt'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    config = require('./api/config/config'),
    mongoose = require('mongoose'),
    ponte = require("ponte"),
    moment = require('moment'),
    expressWinston = require('express-winston'),
    loggly=  require('winston-loggly'),
    winston = require('winston'),
    Route = require('route-parser');

var privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/star_connectingthings_io.key'));
var certificate= fs.readFileSync(path.join(__dirname, 'sslcert/connectingthings.io.chained.crt'));
var ca= fs.readFileSync(path.join(__dirname, 'sslcert/connectingthings.io.chained.crt'));

var credentials = {key: privateKey, cert: certificate,ca: ca, ciphers: [
  "ECDHE-RSA-AES128-SHA256",
  "DHE-RSA-AES128-SHA256",
  "AES128-GCM-SHA256",
  "RC4",
  "HIGH",
  "!MD5",
  "!aNULL"
].join(':')};

var app = express();

// Connect to database
var db = require('./api/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'api/models');
fs.readdirSync(modelsPath).forEach( function (file) { require(modelsPath + '/' + file); });

var pass = require('./api/config/passport');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true,
      json: true
    }),
    new (winston.transports.Loggly)({
      subdomain:        'connthings',
      handleExceptions: true,
      inputToken:       '80f9ead4-a224-4bb0-9ffa-f6bfdc85f3d9',
      json:             true,
      level:            'warn',
      tags:             [process.env.NODE_ENV == 'prod'? "app-prod" : "app-debug"]
    })
  ]
});

// Environments configuration
app.configure( function(){
  app.use(express.errorHandler());

  if(_.isUndefined(process.env.NODE_ENV) || _.isNull(process.env.NODE_ENV)) {
    app.use(express.static(__dirname + '/public'));
  } else {
    app.use(express.static(__dirname + '/dist'));
  }
});

app.use(express.logger('dev'));
app.use(express.cookieParser('MEANP'));
app.use(express.cookieSession());
app.use(express.bodyParser());
app.use(express.methodOverride());

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Place the express-winston logger before the router.
app.use(expressWinston.logger({
  transports: [

    new winston.transports.Loggly({
      subdomain:        'connthings',
      inputToken:       '80f9ead4-a224-4bb0-9ffa-f6bfdc85f3d9',
      json:             true,
      level:            'warn',
      tags:             [process.env.NODE_ENV == 'prod'? "app-prod" : "app-debug"]
    })
  ]
}));

// Bootstrap routes
app.use(app.router);
require('./api/config/routes')(app);

// Place the express-winston errorLogger after the router.
app.use(expressWinston.errorLogger({
  transports: [

    new winston.transports.Loggly({
      subdomain:        'connthings',
      inputToken:       '80f9ead4-a224-4bb0-9ffa-f6bfdc85f3d9',
      json:             true,
      tags:             [process.env.NODE_ENV == 'prod'? "app-prod" : "app-debug"]
    })
  ]
}));

// Start server
var port = process.env.PORT || 3000;
var server;

if(process.env.USE_SSL == 'false' || !process.env.USE_SSL) {
  server = app.listen(port, function () {
    logger.log('listening on port %d in %s mode', port, app.get('env'));
  });
} else {
  server = https.createServer(credentials, app).listen(port, function(){
    logger.log("server started at port 3000");
  });
}

//Start socket conection
var io = require('socket.io').listen(server);
if(process.env.NODE_ENV == 'prod') {
  var redis = require('redis').createClient;
  var adapter = require('socket.io-redis');
  var pub = redis(10002, "lab.redistogo.com", {auth_pass: "eabb6a42a7a9700d09697e72de1240b6"});
  var sub = redis(10002, "lab.redistogo.com", {return_buffers: true, auth_pass: "eabb6a42a7a9700d09697e72de1240b6"});
  io.adapter(adapter({pubClient: pub, subClient: sub}));
}
io.sockets.on('connection', function (socket) {
  logger.log("connect socket server at port 3000");
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
var route = new Route('/device/:device/key/:key');
var validate = require('jsonschema').validate;

// Start socket conection
var ponteServer = ponte(opts);

var tryParseJson = function(str) {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
};
/*
mqtt.createClient(1883, 'localhost')
  .subscribe('panel.update.completed')
  .on('message', function (topic, message) {
    io.sockets.emit('panel.update.completed', message);
    console.log("mqtt client:",topic, message);
  });
*/
ponteServer.on("updated", function(resource, buffer) {

  //console.log("Message received", resource, tryParseJson(buffer.toString()));
  var routeParams = route.match(resource);
  if(!routeParams.device || !routeParams.key) return console.log(resource, buffer.toString());

  var result = tryParseJson(buffer.toString());
  if(!result) return logger.error("Error: Parsing schema, Wrong message format, key: " + routeParams.key);

  var arrayValidation = validate(result, {"$schema":"http://json-schema.org/draft-04/schema#","id":"/","type":"object","properties":{"sensors":{"id":"sensors","type":"array","items":{"id":"0","type":"object","properties":{"tag":{"id":"tag","type":"string"},"value":{"id":"value","type":"string"}},"additionalProperties":false,"required":["tag","value"]},"additionalItems":false,"required":["0"]}},"additionalProperties":false,"required":["sensors"]});
  var objectValidation = validate(result,{"$schema":"http://json-schema.org/draft-04/schema#","id":"/","type":"object","properties":{"tag":{"id":"tag","type":"string"},"value":{"id":"value","type":"string"}},"additionalProperties":false,"required":["tag","value"]});

  if(arrayValidation.errors.length !== 0 && objectValidation.errors.length !== 0 ) return logger.error("Error: Parsing schema, Wrong message format, key: " + routeParams.key);
  if(objectValidation.errors.length === 0 && arrayValidation.errors.length !== 0 ){ result = { sensors:[{ tag: result.tag, value:result.value }] }; }

  async.each(result.sensors, function(sensor, next) {

    if(!sensor.tag || !sensor.value) return next("Error: Iterating sensors, Wrong message format, key: " + routeParams.key);

    var message = {
      topic:  "/" +routeParams.key + "/"+ routeParams.device +"/"+ sensor.tag,
      body: { value: sensor.value, key: routeParams.key }
    };

    //if(lastValue.topic == message.topic && lastValue.value == message.body.value) return next();

    async.waterfall([
      function (callback) {
        User.findOne({key: routeParams.key}, callback);
      },
      function (user, callback) {
        if (!user) return callback({message: "Error: User validation, Not found, key: " + routeParams.key}, null);

        //Set expiration message and restrict interval between messages
        message.expireAt = user.accountType == "Free" ? moment().add(1, 'day').toDate() : moment().add(1, 'week').toDate();
        var ms = moment(moment.utc().format()).diff(moment(user.statistics.lastUpdate.toISOString()));
        if (moment.duration(ms).asSeconds() < 1 && user.accountType == "Free") return callback({message: "Error: Message validation, Interval should be more than 1 seconds, key: " + routeParams.key}, null);
        triggerService.execute(user, message, callback);
      },
      function (user, callback) {
        io.sockets.emit(message.topic, message.body);
        user.statistics.messages++;
        user.statistics.lastUpdate = new Date();
        User.update({_id: user._id}, {statistics: user.statistics}, callback);
      },
      function (result, callback) {
        // if(lastValue.topic == resource && lastValue.value ==  message.body.value) return callback(null,null);

        var newMessage = new Message({
          topic: message.topic,
          value: message.body.value,
          key: message.body.key,
          expireAt: message.expireAt
        });
        newMessage.save(callback);
      }
    ], function (err, message) {
      if (err) return next(err.code, err.message);

      //if (message) { lastValue = message.toObject(); }
      next();
    });

  }, function(err){
    if( err ) return logger.error(err);

  });

});



