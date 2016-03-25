'use strict';

var mongoose = require('mongoose'),
    config = require('../config/config')
exports.mongoose = mongoose;

var mongoOptions = { replset: { strategy: "ping", rs_name: 'rs-ds025719', safe: true }};;



// Connect to Database
exports.db = mongoose.connect(config.db.default, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.db.default + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db.default);
  }
});
