'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  _ = require('underscore'),
  Trigger = mongoose.model('Trigger'),
  User = mongoose.model('User'),
  Mailgun = require('mailgun-js'),
  request = require('request');

var api_key = 'key-966ab673e0452234ef90349363496a34';
var domain = 'connectingthings.io';
var from_who = 'alarm@connectingthings.io';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});


exports.execute = function (user, message, callback) {

  Trigger
    .find({ owner : user._id })
    .populate('device')
    .populate('sensor')
    .exec(function(error, triggers){
      if(error) return callback(error);
      if(!triggers) return callback(null, user);

      async.each(triggers, function(trigger, next) {

        if(message.topic !== "/" + trigger.device.name + "/" + trigger.sensor.tag ) return next();

        var triggeredValue = (trigger.rule == "equals to" && parseFloat(message.body.value) == parseFloat(trigger.value)) ||
                          (trigger.rule == "bigger than" && parseFloat(message.body.value) > parseFloat(trigger.value)) ||
                          (trigger.rule == "lower than" && parseFloat(message.body.value) < parseFloat(trigger.value));

        if(triggeredValue && trigger.action == "Send email to"){

          var data = {
            from: from_who,
            to: user.email,
            subject: 'Alarm'+ trigger.name+ 'triggered',
            html: '<p>Sensor alarm '+ trigger.sensor.tag + "</br>" +
                  'Rule: when '+trigger.value + "is "+trigger.rule+ message.body.value+"</p>"
          };

          mailgun.messages().send(data, function (err, body) {
            if (err) return next(err);
            next();
          });

        } else if(triggeredValue && trigger.action == "Send to IFTTT") {
          var url = 'https://maker.ifttt.com/trigger/'+ trigger.name+'/with/key/'+trigger.target;
          var body = { "value1": trigger.value, "value2": trigger.rule,"value3": message.body.value}

          request.post({url: url,  json: true, body: body}, function(error, response, body) {
            if (error) return next(error);
            next();
          });
        }

      }, function(err){
        if( err ) return callback(err);

        callback(null, user);
      });

    })
};