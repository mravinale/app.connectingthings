'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    Device = mongoose.model('Device'),
    User = mongoose.model('User');

exports.create = function (req, res, next) {
    var newDevice = new Device(req.body);
    newDevice.owner = req.user;
    newDevice.organization = req.user.organization;
    var errorMessage = "Error: Limit reached for your account";

    async.waterfall([
      function(callback) {
        var userId = req.user._id;

        User.findById(userId, function (err, user) {
            if (err) {
                return callback( {message: 'Failed to load User'}, null);
            }

            switch(user._doc.accountType) {
                case "free":
                    return callback( user._doc.statistics.devices >= 2? {message: errorMessage} : null, null);
                    break;
                case "bronze":
                    return callback( user._doc.statistics.devices >= 5? {message: errorMessage} : null, null);
                    break;
                case "silver":
                    return callback( user._doc.statistics.devices >= 10? {message: errorMessage} : null, null);
                    break;
                case "gold":
                    return callback( user._doc.statistics.devices >= 15? {message: errorMessage} : null, null);
                    break;
                case "full":
                    return callback(user._doc.statistics.devices >= 20 ? {message: errorMessage} : null, null);
                    break;
                default:
                    return callback({message: "Error: not recognized accountType", detail: user._doc.accountType}, null);
            }

        });

      },
      function(result, callback) {
        newDevice.save(callback)
      },
      function(device, result, callback) {
        req.user.statistics.devices++;
        User.update({_id: req.user._id}, { statistics: req.user.statistics },  function(err, result){
            if (err) return callback(err);

            callback(null, device)
        });
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};


exports.getAll = function (req, res, next) {

    Device
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sensors')
        .exec(function (error, devices) {
            Device
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
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
      function(result, callback) {
        req.user.statistics.devices--;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
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