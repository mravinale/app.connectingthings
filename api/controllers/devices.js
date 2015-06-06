'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    Device = mongoose.model('Device'),
    User = mongoose.model('User');

exports.create = function (req, res, next) {
    var newDevice = new Device(req.body);
    newDevice.owner = req.user;
    newDevice.organization = req.user.organization;

    async.waterfall([
      function(callback) {
        newDevice.save(callback)
      },
      function(error, result, callback) {
        User.update({_id: req.user._id}, { statistics: { devices: req.user.statistics.devices +  1 } }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};


exports.getAll = function (req, res, next) {

    Device
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sensors')
        .exec(function (error, devices) {
            Device.count().exec(function (error, count) {
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

    Device
        .find({owner: req.user})
       // .find({organization: req.user.organization})
        .populate('sensors')
        .exec(function (error, devices) {
        if (error) {
           console.log(error);
           return res.send(400, error);
        }
        return  res.send(200, devices);

    });
}


exports.getFullById = function (req, res, next) {

    Device
        .findOne({_id: req.params.id})
        .populate('sensors')
        .exec(function (error, device) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, device);
            }
        })
};

exports.getById = function (req, res, next) {

    Device
        .findOne({_id: req.params.id})
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
        Device.remove({ _id: req.params.id }, callback)
      },
      function(error, callback) {
        User.update({_id: req.user._id}, { statistics: { devices: req.user.statistics.devices -  1 } } , callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;
		req.body.sensors = req.body.sensors.length == 0? null : req.body.sensors;

    Device.update({_id: req.params.id}, req.body,{ runValidators: true }, function (error, device) {
        if (error) return res.json(400, error);

        return  res.json(device);

    });
};