'use strict';

var mongoose = require('mongoose'),
  Dashboard = mongoose.model('Dashboard')


exports.createDashboard = function (req, res, next) {
    var newDashboard = new Dashboard(req.body);

    Dashboard.remove({}, function (error) {
        if (error) return res.send(400, error);

        newDashboard.save(function(err, panel) {
            if (error) return res.send(400, error);

            return res.send(200, panel);
        });
    });
};

exports.getDashboard = function (req, res, next) {

    Dashboard.find().exec(function (error, panels) {
        if (error)  return res.send(400, error);

        return  res.send(200, panels);

    });
}