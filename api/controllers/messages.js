'use strict';

var mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    async = require('async'),
  User = mongoose.model('User'),
    moment = require('moment');


exports.getAll = function (req, res, next) {

    Message
        .find({key: req.user.key})
        .or([{topic: new RegExp(req.query.search, "i")}, {value: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, messages) {
            Message.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:messages, count: count});
                }
            });
        });
};

exports.getAllMessages = function (req, res, next) {

    var today = moment().startOf('day')
    var tomorrow = moment(today).add(1, 'days')

    Message
        .find({
            topic: req.query.topic,
            createdAt: {
                $gte: today.toDate(),
                $lt: tomorrow.toDate()
            }
        })
        .sort({ createdAt: 'desc' })
        .limit(20)
        .exec(function (error, messages) {
            if (error) {
               console.log(error);
               return res.send(400, error);
            }
            return  res.send(200, messages);
    });
};

exports.getAllByUser = function (req, res, next) {

    Message
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, messages) {
            Message.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:messages, count: count});
                }
            });
        });
};


exports.remove = function (req, res, next) {

    async.waterfall([
        function(callback) {
            Message.remove({ _id: req.params.id }, callback)
        },
        function(result, callback) {
            req.user.statistics.messages--;
            User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
        }
    ], function (err, result) {
        if (err) return res.send(400, err);

        return res.send(200, result);
    });

};

