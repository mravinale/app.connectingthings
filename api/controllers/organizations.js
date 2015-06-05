'use strict';

var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization')


exports.create = function (req, res, next) {
    var newOrganization = new Organization(req.body);

    newOrganization.save(function(err, panel) {
        if (err) {
            return res.send(400, err);
        }

        return res.send(200, panel);
    });
};

exports.getAll = function (req, res, next) {
    //var query = req.user.organization == "admin" && req.user.admin ? {} : {organization: req.user.organization};

    Organization
        .find()
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, devices) {
            Organization.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:devices, count: count});
                }
            });
        });
};

exports.getAllOrganizations = function (req, res, next) {

    Organization
        .find()
        .exec(function (error, organizations) {
            if (error) {
                return res.send(400, error);
            }
            return  res.send(200, organizations);
        });
};



exports.getById = function (req, res, next) {

    Organization.findOne({_id: req.params.id})
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

    Organization.remove({ _id: req.params.id }, function (error) {
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
    Organization.update({_id: req.params.id}, req.body,{upsert: true, runValidators: true }, function (error, device) {
        if (error) {
            console.log(error);
            return res.json(400, error);
        }

        return  res.json(device);

    });
};