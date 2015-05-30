'use strict';

var mongoose = require('mongoose'),
    Dashboard = mongoose.model('Dashboard'),
    Panel = mongoose.model('Panel'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor'),
    Camera = mongoose.model('Camera'),
    Device = mongoose.model('Device');


exports.create = function (req, res, next) {
    var newDashboard = new Dashboard(req.body);
    newDashboard.owner = req.user;
    newDashboard.organization = req.user.organization;

    newDashboard.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};


exports.getAll = function (req, res, next) {

    Dashboard
        .find({organization: req.user.organization})
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sections')
        .exec(function (error, dashboards) {
            Dashboard.count().exec(function (error, count) {
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
        .find({organization: req.user.organization})
        .populate('sections')
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

    Dashboard.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
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
	  req.body.sections = req.body.sections.length == 0? null : req.body.sections;

    Dashboard.update({_id: req.params.id}, req.body,{ runValidators: true }, function (error, dashboard) {
        if (error) return res.json(400, error);

        return  res.json(dashboard);
    });
};