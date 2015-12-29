'use strict';
if(process.argv[2] == '-dist') {
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
  mongoStore = require('connect-mongo')(express),
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


// Place the express-winston logger before the router.
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename:         'logs.log',
      handleExceptions: true,
      json:             true,
      maxsize:          5242880,
      maxFiles:         5,
      colorize:         false,
      level:            'warn'
    }),
    new winston.transports.Loggly({
      subdomain:        'connthings',
      inputToken:       '80f9ead4-a224-4bb0-9ffa-f6bfdc85f3d9',
      json:             true,
      level:            'warn',
      tags:             [process.argv[2] === "-dist"? "app-prod" : "app-debug"]
    })
  ]
}));

// Bootstrap routes
app.use(app.router);
require('./api/config/routes')(app);

// Place the express-winston errorLogger after the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename:         'http-logs.log',
      handleExceptions: true,
      json:             true,
      maxsize:          5242880,
      maxFiles:         5,
      colorize:         false
    }),
    new winston.transports.Loggly({
      subdomain:        'connthings',
      inputToken:       '80f9ead4-a224-4bb0-9ffa-f6bfdc85f3d9',
      json:             true,
      tags:             [process.argv[2] === "-dist"? "app-prod" : "app-debug"]
    })
  ]
}));


// Start server
var port = process.env.PORT || 3000;

var server= app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});
/*
var server = https.createServer(credentials, app).listen(3000, function(){
  console.log("server started at port 3000");
});
*/
//Start socket conection
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("connect socket server at port 3000");
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

  var routeParams = route.match(resource);
  if(!routeParams.device || !routeParams.key) return console.log("Wrong url format");

  var result = tryParseJson(buffer.toString());
  if(!result.sensors || !result.sensors[0].tag || !result.sensors[0].value) return console.log("Wrong message format");
 // var message = { topic: resource, body: tryParseJson(buffer.toString())}; //https://www.npmjs.com/package/jsonschema
 // if(!message.body || !message.body.value || !message.body.key) return console.log("Wrong message format");

  async.waterfall([
    function(callback) {
      User.findOne({ key : message.body.key },callback);
    },
    function(user, callback) {
      if(!user) return callback({message: "User not found for key: " + routeParams.key}, null);

      var message = {
        topic:  "/" +routeParams.key + "/"+ routeParams.device +"/"+ result.sensors[0].tag,
        body: { value: result.sensors[0].value, key: routeParams.key },
        expireAt:  user.accountType == "Free"? moment().add(1, 'day').toDate() : moment().add(1, 'week').toDate()
      };

      //Set expiration messge and restrict interval between messages
      var ms = moment(moment.utc().format()).diff(moment(user.statistics.lastUpdate.toISOString()));
      if(moment.duration(ms).asSeconds() < 1 &&  user.accountType == "Free") return callback({message: "Message interval should be more than 10 seconds"}, null);
      triggerService.execute(user, message, callback);
    },
    function( user, callback) {
      io.sockets.emit(message.topic, message.body);
      user.statistics.messages++;
      user.statistics.lastUpdate = new Date();
      User.update({ _id : user._id }, { statistics: user.statistics }, callback);
    },
    function(result, callback) {
      // if(lastValue.topic == resource && lastValue.value ==  message.body.value) return callback(null,null);

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