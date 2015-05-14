'use strict';

var mongoose = require('mongoose'),
    Dashboard = mongoose.model('Dashboard'),
    Panel = mongoose.model('Panel'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor'),
    Camera = mongoose.model('Camera'),
    Device = mongoose.model('Device'),
    User = mongoose.model('User');



exports.getAllDashboards = function (req, res, next) {

    User
        .findOne({key: req.params.key})
        .exec(function (error, user) {
            if (error) { return res.send(400, error); }

            Dashboard
                .find({organization: user.organization})
                .populate('sections')
                .populate('owner')
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
        });


};