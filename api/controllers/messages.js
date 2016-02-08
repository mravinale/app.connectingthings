'use strict';

var mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    moment = require('moment');


exports.getAll = function (req, res, next) {

    Message
        .find({topic: req.query.topic})
        .sort({name: 'asc'})
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


