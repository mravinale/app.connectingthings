'use strict';

var mongoose = require('mongoose'),
    Camera = mongoose.model('Camera')


exports.create = function (req, res, next) {
    var newCamera = new Camera(req.body);
    newCamera.owner = req.user;

    newCamera.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};


exports.getAll = function (req, res, next) {

    Camera
        .find({owner: req.user.id})
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, cameras) {
            Camera.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:cameras, count: count});
                }
            });
        });
}

exports.getAllCameras = function (req, res, next) {

    Camera
        .find({owner: req.user.id})
        .exec(function (error, cameras) {
        if (error) {
           console.log(error);
           return res.send(400, error);
        }
        return  res.send(200, cameras);

    });
}


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

    Camera.remove({ _id: req.params.id }, function (error) { 
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
    Camera.update({_id: req.params.id}, req.body,{upsert: true}, function (error, camera) {
        if (error) {
           console.log(error);
           return res.json(400, error);
        }

        return  res.json(camera);

    });
};