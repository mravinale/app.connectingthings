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

    Message
        .find({ topic: req.query.topic })
        .sort({createdAt: 'desc'})
        .limit(20)
        .exec(function (error, messages) {
            if (error) {
               console.log(error);
               return res.send(400, error);
            }
            return  res.send(200, messages);
    });
};


