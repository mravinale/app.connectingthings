'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
  Trigger = mongoose.model('Trigger'),
  User = mongoose.model('User'),
  Mailgun = require('mailgun-js'),
  moment = require('moment'),
  request = require('request');

var api_key = 'key-966ab673e0452234ef90349363496a34';
var domain = 'connectingthings.io';
var from_who = 'ConnectingThings Alarm <alarm@connectingthings.io>';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var alertPath = path.join(__dirname, '../templates/Alert.html');


exports.execute = function (user, message, callback) {

  Trigger
    .find({ owner : user._id })
    .populate('device')
    .populate('sensor')
    .exec(function(error, triggers){
      if(error) return callback(error);
      if(!triggers) return callback(null, user);

      async.each(triggers, function(trigger, next) {

        if(!trigger.isEnabled) return next();

        if(message.topic !== "/"  + user.key + "/" + trigger.device.name + "/" + trigger.sensor.tag ) return next();

        var triggeredValue =
        (trigger.rule == "equals to" && message.body.value == trigger.value) ||
        (trigger.rule == "bigger than" && parseFloat(message.body.value) > parseFloat(trigger.value)) ||
        (trigger.rule == "lower than" && parseFloat(message.body.value) < parseFloat(trigger.value));

        if(user.statistics.triggers.last !== undefined) {
          var ms = moment(moment.utc().format()).diff(moment(user.statistics.triggers.last.toISOString()));
          if(moment.duration(ms).asSeconds() < trigger.threshold) return next();
        }

        if(triggeredValue && trigger.action == "Send email to"){

          fs.readFile(alertPath, function (err, html) {
            if (err) {
              return  next(err);
            }

            var data = {
              from: from_who,
              to: trigger.target,
              subject: trigger.name + ' has been executed',
              html: _.template(html.toString(), {
                triggerName: trigger.name,
                messageValue: message.body.value,
                triggerRule: trigger.rule,
                triggerValue: trigger.value,
                userName: user.username,
                publicUrl: user.publicUrl
              })
            };

            mailgun.messages().send(data, function (error, body) {
              if (error) return next(error);

              user.statistics.triggers.email++;
              user.statistics.triggers.last = new Date();
              next();
            });

          });

        } else if(triggeredValue && trigger.action == "Send to IFTTT") {

          var url = 'https://maker.ifttt.com/trigger/' +trigger.name+ '/with/key/' +trigger.target;
          var body = { "value1": trigger.value, "value2": trigger.rule,"value3": message.body.value};

          request.post({url: url,  json: true, body: body}, function(error, response, body) {
            if (error) return next(error);

            user.statistics.triggers.iftt++;
            user.statistics.triggers.last = new Date();
            next();
          });
        } else {
          next();
        }

      }, function(err){
        if( err ) return callback(err);

        callback(null, user);
      });

    })
};