'use strict';

var mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor')


exports.create = function (req, res, next) {
    var newSensor = new Sensor(req.body);
    newSensor.owner = req.user;
    newSensor.organization = req.user.organization;

    newSensor.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};

exports.getAll = function (req, res, next) {

    Sensor
        .find({organization: req.user.organization})
        .sort({name: 'asc'})
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
        .find({organization: req.user.organization})
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

    Sensor.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
        if (error) {
            log.error(error);
            res.send(400, error);
        } else {
            res.send(200);
        }
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