'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore'),
    Dashboard = mongoose.model('Dashboard'),
    Panel = mongoose.model('Panel'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor'),
    Camera = mongoose.model('Camera'),
    Device = mongoose.model('Device'),
    User = mongoose.model('User');

exports.getAllDashboards = function (req, res, next) {

    User
        .findOne({publicKey: req.params.key || ""})
        .exec(function (error, user) {
            if (error) { return res.send(400, error); }
            if (!user) { return res.send(400, "user not found"); }


          Dashboard
            .find({owner: req.user})
            //.find({organization: req.user.organization})
            .populate('panels')
            .populate('sections')
            .populate('owner')
            .lean()
            .exec(function (error, dashboards) {
              if (error) { return res.send(400, error); }

              Sensor.populate(dashboards, {
                path: 'panels.sensor',
                model: 'Sensor'
              },function (err) {
                if (error) { return res.send(400, error); }

                Device.populate(dashboards, {
                  path: 'panels.device',
                  model: 'Device'
                },function (err,result) {
                  if (error) { return res.send(400, error); }

                  Camera.populate(dashboards, {
                    path: 'panels.camera',
                    model: 'Camera'
                  },function (err) {
                    if (error) { return res.send(400, error); }

                    result = (result.length === 0)? [{name: "No Dashboard yet"}] : result;

                    _.each(result,function(dashboard){
                      dashboard.owner = _.pick(user , 'email','publicUrl','statistics', 'username', 'publicAvatar', 'accountType')
                    });

                    return  res.send(200, result);
                  });

                });
              });

            });


        });
};