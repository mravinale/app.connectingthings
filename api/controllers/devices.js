'use strict';

var mongoose = require('mongoose'),
    Device = mongoose.model('Device')


exports.create = function (req, res, next) {
    var newDevice = new Device(req.body);
    newDevice.owner = req.user;
    newDevice.organization = req.user.organization;

    newDevice.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};


exports.getAll = function (req, res, next) {

    Device
        .find({organization: req.user.organization})
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
        .find({organization: req.user.organization})
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

    Device.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
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
    Device.update({_id: req.params.id}, req.body,{upsert: true, runValidators: true }, function (error, device) {
        if (error) {
           console.log(error);
           return res.json(400, error);
        }

        return  res.json(device);

    });
};