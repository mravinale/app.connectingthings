'use strict';

var mongoose = require('mongoose'),
    MyDashboard = mongoose.model('MyDashboard');


exports.createMyDashboard = function (req, res, next) {
    var newMyDashboard = new MyDashboard(req.body);

    MyDashboard.remove({}, function (error) {
        if (error) return res.send(400, error);

        newMyDashboard.save(function(err, dashboard) {
            if (error) return res.send(400, error);

            return res.send(200, dashboard);
        });
    });
};

exports.getMyDashboard = function (req, res, next) {

    MyDashboard.find().exec(function (error, dashboard) {
        if (error)  return res.send(400, error);

        return  res.send(200, dashboard[0]);

    });
}