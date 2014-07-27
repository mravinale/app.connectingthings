'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    MyDashboard = mongoose.model('MyDashboard');


exports.createMyDashboard = function (req, res, next) {

    MyDashboard.remove({}, function (error) {
        if (error) return res.send(400, error);

        async.each(req.body, function( dashboard, callback) {

            var newMyDashboard = new MyDashboard(dashboard);
            newMyDashboard.owner = req.user;

            newMyDashboard.save(callback);

            }, function (error) {
                if (error) return res.send(400, error);

                MyDashboard.find().exec(function (error, dashboards) {
                    if (error)  return res.send(400, error);

                    return  res.send(200, dashboards);
                });

            });
        });
};

exports.getMyDashboard = function (req, res, next) {

    MyDashboard.find().exec(function (error, dashboards) {
        if (error)  return res.send(400, error);

        return  res.send(200, dashboards);

    });
}