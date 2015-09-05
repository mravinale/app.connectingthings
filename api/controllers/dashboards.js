'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    Dashboard = mongoose.model('Dashboard'),
    Panel = mongoose.model('Panel'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor'),
    Camera = mongoose.model('Camera'),
    Device = mongoose.model('Device'),
    User = mongoose.model('User');


exports.create = function (req, res, next) {
    var newDashboard = new Dashboard(req.body);
    newDashboard.owner = req.user;
    newDashboard.organization = req.user.organization;

    async.waterfall([
      function(callback) {
        newDashboard.save(callback)
      },
      function(dashboard, result, callback) {
        req.user.statistics.dashboards++;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.getAll = function (req, res, next) {

    Dashboard
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sections')
        .exec(function (error, dashboards) {
            Dashboard
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:dashboards, count: count});
                }
            });
        });
}

exports.getAllDashboards = function (req, res, next) {

    Dashboard
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .populate('sections')
        .populate('owner')
        .lean()
        .exec(function (error, dashboards) {
            if (error) { return res.send(400, error); }

            Panel.populate(dashboards, {
                path: 'sections.panels',
                model: 'Panel'
            },function (err) {
                if (error) { return res.send(400, error); }

                Sensor.populate(dashboards, {
                    path: 'sections.panels.sensor',
                    model: 'Sensor'
                },function (err) {
                    if (error) { return res.send(400, error); }

                    Device.populate(dashboards, {
                        path: 'sections.panels.device',
                        model: 'Device'
                    },function (err) {
                        if (error) { return res.send(400, error); }

                        Camera.populate(dashboards, {
                            path: 'sections.panels.camera',
                            model: 'Camera'
                        },function (err, result) {
                            if (error) { return res.send(400, error); }

                            return  res.send(200, result);
                        });

                    });
                });
            });
        });
}

exports.getFullById = function (req, res, next) {

    Dashboard
        .findOne({_id: req.params.id})
        .populate('sections')
        .exec(function (error, dashboard) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, dashboard);
            }
        })
};

exports.getById = function (req, res, next) {

    Dashboard
        .findOne({_id: req.params.id})
        .exec(function (error, dashboard) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, dashboard);
            }
        })
};

exports.remove = function (req, res, next) {

    async.waterfall([
      function(callback) {
        Dashboard.remove({ _id: req.params.id }, callback)
      },
      function(result, callback) {
        req.user.statistics.dashboards--;
        User.update({_id: req.user._id}, { statistics: req.user.statistics }, callback);
      }
    ], function (err, result) {
      if (err) return res.send(400, err);

      return res.send(200, result);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;
	  req.body.sections = req.body.sections.length == 0? null : req.body.sections;

    Dashboard.update({_id: req.params.id}, req.body,{ runValidators: true }, function (error, dashboard) {
        if (error) return res.json(400, error);

        return  res.json(dashboard);
    });
};