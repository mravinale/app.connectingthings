'use strict';

var mongoose = require('mongoose'),
    Section = mongoose.model('Section')


exports.create = function (req, res, next) {
    var newSection = new Section(req.body);

    newSection.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};

exports.getAll = function (req, res, next) {

    Section
        .find()
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, devices) {
            Section.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:devices, count: count});
                }
            });
        });
}

exports.getAllSections = function (req, res, next) {

    Section.find().exec(function (error, devices) {
        if (error) {
           console.log(error);
           return res.send(400, error);
        }
        return  res.send(200, devices);

    });
}


exports.getById = function (req, res, next) {

    Section.findOne({_id: req.params.id})
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

    Section.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
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
    Section.update({_id: req.params.id}, req.body,{upsert: true}, function (error, device) {
        if (error) {
           console.log(error);
           return res.json(400, error);
        }

        return  res.json(device);

    });
};