'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    Trigger = mongoose.model('Trigger'),
    User = mongoose.model('User');

exports.create = function (req, res, next) {
    var newTrigger = new Trigger(req.body);
    newTrigger.owner = req.user;
    newTrigger.organization = req.user.organization;

    newTrigger.save(function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.getAll = function (req, res, next) {

    Trigger
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }, {rule: new RegExp(req.query.search, "i") }, {value: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sensor')
        .populate('device')
        .exec(function (error, triggers) {
            Trigger
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }, {rule: new RegExp(req.query.search, "i") }, {value: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:triggers, count: count});
                }
            });
        });
};

exports.getAllTriggers = function (req, res, next) {

    Trigger
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .exec(function (error, triggers) {
            if (error) {
               console.log(error);
               return res.send(400, error);
            }
            return  res.send(200, triggers);
    });
};

exports.getById = function (req, res, next) {

    Trigger.findOne({_id: req.params.id})
     //   .populate('sensor')
     //   .populate('device')
        .exec(function (error, trigger) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, trigger);
            }
        })
};

exports.remove = function (req, res, next) {

    Trigger.remove({ _id: req.params.id }, function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;

    Trigger.update({_id: req.params.id}, req.body,{runValidators: true }, function (error, trigger) {
        if (error) return res.json(400, error);

        return  res.json(trigger);
    });
};


