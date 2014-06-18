'use strict';

var mongoose = require('mongoose'),
  Dashboard = mongoose.model('Dashboard');


exports.createDashboard = function (req, res, next) {
    var newDashboard = new Dashboard(req.body);

    Dashboard.remove({}, function (error) {
        if (error) return res.send(400, error);

        newDashboard.save(function(err, dashboard) {
            if (error) return res.send(400, error);

            return res.send(200, dashboard);
        });
    });
};

exports.getDashboard = function (req, res, next) {

    Dashboard.find().exec(function (error, dashboard) {
        if (error)  return res.send(400, error);

        return  res.send(200, dashboard[0]);

    });
}