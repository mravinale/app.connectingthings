'use strict';


// Module dependencies.
var express = require('express'),
    _ = require('underscore'),
    http = require('http'),
    path = require('path'),
    fs = require('fs')

var app = express();

// Environments configuration
app.configure( function(){
  app.use(express.errorHandler());
  app.use(express.static(__dirname + '/dist'));
});
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});
app.use(express.cookieSession());
app.use(express.bodyParser());
app.use(express.methodOverride());



// Start server
var port = 3001;
var server = app.listen(3100, function () {
  console.log('listening on port %d in %s mode', port, app.get('env'));
});




