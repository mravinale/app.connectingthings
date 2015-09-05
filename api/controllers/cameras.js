'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    Camera = mongoose.model('Camera'),
    User = mongoose.model('User');

exports.create = function (req, res, next) {
    var newCamera = new Camera(req.body);
    newCamera.owner = req.user;
    newCamera.organization = req.user.organization;

    async.waterfall([
      function(callback) {
        newCamera.save(callback)
      },
      function(camera, result, callback) {
        req.user.statistics.cameras++;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });
};

exports.getAll = function (req, res, next) {

    Camera
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, cameras) {
            Camera
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:cameras, count: count});
                }
            });
        });
};

exports.getAllCameras = function (req, res, next) {

    Camera
        .find({owner: req.user})
      //  .find({organization: req.user.organization})
        .exec(function (error, cameras) {
        if (error) {
           console.log(error);
           return res.send(400, error);
        }
        return  res.send(200, cameras);

    });
};

exports.getFullById = function (req, res, next) {

    Camera
        .findOne({_id: req.params.id})
        .exec(function (error, camera) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, camera);
            }
        })
};

exports.getById = function (req, res, next) {

    Camera
        .findOne({_id: req.params.id})
        .exec(function (error, camera) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, camera);
            }
        })
};

exports.remove = function (req, res, next) {

    async.waterfall([
      function(callback) {
        Camera.remove({ _id: req.params.id }, callback)
      },
      function(result, callback) {
        req.user.statistics.cameras--;
        User.update({_id: req.user._id}, { statistics: req.user.statistics } , callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;

    Camera.update({ _id: req.params.id }, req.body,{ upsert: true, runValidators: true }, function (error, camera) {
        if (error) return res.json(400, error);

        return  res.json(camera);
    });
};