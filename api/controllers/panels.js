'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    Panel = mongoose.model('Panel'),
    Dashboard = mongoose.model('Dashboard'),
    mqtt = require('mqtt'),
    mqttClient = mqtt.connect({ port: 1883, host: 'localhost'}),
    Client = require('node-rest-client').Client,
    User = mongoose.model('User'),
    client = new Client();

exports.create = function (req, res, next) {
    var newPanel = new Panel(req.body);
    newPanel.owner = req.user;
    newPanel.organization = req.user.organization;

    async.waterfall([

      function(callback) {
        newPanel.save(callback)
      },
      function(panel, result, callback) {
        Dashboard.findOne({ _id: newPanel.dashboard }).lean().exec(callback);
      },
      function(dashboard, callback) {
        delete dashboard._id;
        dashboard.panels.push(newPanel._id);
        Dashboard.update({_id: newPanel.dashboard}, dashboard,{ runValidators: true }, callback);
      },
      function(result, callback) {
        req.user.statistics.panels++;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, newPanel);
    });
};

exports.getAll = function (req, res, next) {

    Panel
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {type: new RegExp(req.query.search, "i") }, {size: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sensor')
        .populate('dashboard')
        .exec(function (error, panels) {
            Panel
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {type: new RegExp(req.query.search, "i") }, {size: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:panels, count: count});
                }
            });
        });
}

exports.getAllPanels = function (req, res, next) {

    Panel
        .find({owner: req.user})
        .lean()
        //.find({organization: req.user.organization})
        .exec(function (error, panels) {
            if (error) {
               return res.send(400, error);
            }

            return  res.send(200, panels);

        });
}


exports.getAllNotAssignedPanels = function (req, res, next) {

  Panel
    .find({owner: req.user})
    .find({dashboard: null})
    .lean()
    //.find({organization: req.user.organization})
    .exec(function (error, panels) {
      if (error) {
        return res.send(400, error);
      }

      return  res.send(200, panels);

    });
}

exports.getById = function (req, res, next) {

    Panel.findOne({_id: req.params.id})
        .exec(function (error, panel) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, panel);
            }
        })
};

exports.remove = function (req, res, next) {

  var panelToRemove = null;
    async.waterfall([
      function(callback) {
        Panel.findOne({ _id: req.params.id }).lean().exec(callback);
      },
      function(panel, callback) {
        panelToRemove = panel;
        Panel.remove({ _id: req.params.id }, callback)
      },
      function(result, callback) {
        req.user.statistics.panels--;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      },
      function(result, callback) {
        if(!panelToRemove.dashboard) callback({message: "No dashboard relation for panel "+panelToRemove._id});
        Dashboard.findOne({ _id: panelToRemove.dashboard }).lean().exec(callback);
      },
      function(dashboard, callback) {
        delete dashboard._id;
        dashboard.panels = _.reject(dashboard.panels, function(panelId){ return panelToRemove._id == panelId });
        Dashboard.update({_id: panelToRemove.dashboard}, dashboard,{ runValidators: true }, callback);
      }

    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, panelToRemove);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;

    var result = {errors: {}};
    if(req.body.type === "camera" && !req.body.camera){
      result.errors.camera = {message: 'Path `camera` is required.'}
    }
    if(req.body.type !== "camera" && !req.body.device){
      result.errors.device = {message: 'Path `device` is required.'}
    }
    if(req.body.type !== "camera" && !req.body.sensor){
      result.errors.sensor = {message: 'Path `sensor` is required.'}
    }

    if( result.errors.sensor ||  result.errors.device ||  result.errors.camera){
      return res.json(400, result);
    }

    Panel.update({_id: req.params.id}, req.body,{upsert: true, runValidators: false }, function (error, panel) {
        if (error) return res.json(400, error);
/*
      Panel
        .find({owner: req.user})
        .exec(function (error, panels) {
          if (error) {
            console.log(error);
          }
          mqttClient.publish("panel.update.completed", JSON.stringify(panels));

        });
*/
        return  res.json(panel);
    });
};

exports.command = function (req, res, next) {

    /*
    if(req.body.protocol == "http") {

        client.get(req.body.url + "?" + req.body.tag + "=" + req.body.message.value, function (data, response) {
            mqttClient.publish(req.body.topic, JSON.stringify(req.body.message));
            return res.send(200, "ok");
        });

    }
    */

   // if(req.body.protocol == "mqtt"){

   //     mqttClient.publish(req.body.topic, JSON.stringify(req.body.message), {retain: true});
        return res.json({result: "no action, try mqtt"});

 //   }
};

