'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    Sensor = mongoose.model('Sensor'),
    User = mongoose.model('User');


exports.create = function (req, res, next) {
    var newSensor = new Sensor(req.body);
    newSensor.owner = req.user;
    newSensor.organization = req.user.organization;

    async.waterfall([
      function(callback) {
        newSensor.save(callback)
      },
      function(sensor, result, callback) {
        req.user.statistics.sensors++;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.getAll = function (req, res, next) {

    Sensor
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {tag: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, devices) {
            Sensor.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:devices, count: count});
                }
            });
        });
}

exports.getAllDevices = function (req, res, next) {

    Sensor
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .exec(function (error, devices) {
        if (error) {
           console.log(error);
           return res.send(400, error);
        }
        return  res.send(200, devices);

    });
}


exports.getById = function (req, res, next) {

    Sensor.findOne({_id: req.params.id})
        .exec(function (error, device) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, device);
            }
        })
};

exports.remove = function (req, res, next) {

    async.waterfall([
      function(callback) {
        Sensor.remove({ _id: req.params.id }, callback)
      },
      function(result, callback) {
        req.user.statistics.sensors--;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;
    Sensor.update({_id: req.params.id}, req.body,{upsert: true, runValidators: true }, function (error, device) {
        if (error) {
           console.log(error);
           return res.json(400, error);
        }

        return  res.json(device);

    });
};