'use strict';

var mongoose = require('mongoose'),
  Panel = mongoose.model('Panel')


exports.create = function (req, res, next) {
    var newPanel = new Panel(req.body);

    newPanel.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};


exports.getAll = function (req, res, next) {

    Panel
        .find()
        .sort('name')
        .exec(function (error, panels) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, panels);
            }
        });
}


exports.getById = function (req, res, next) {

    Panel.findById(req.params.orgid)
        .exec(function (error, panels) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, panels);
            }
        })
};

exports.remove = function (req, res, next) {

    Panel.remove({ _id: req.params.panelId }, function (error) { // TODO remove seems fussy
        if (error) {
            log.error(error);
            res.send(400, error);
        } else {
            res.send(200);
        }
    });
};

exports.update = function (req, res, next) {

    Panel.update({_id: req.params.orgId}, req.body, options, function (error, panel) {
        if (error) {
            log.error(error);
            res.send(400, error);
        } else {
            res.send(200, panel);
        }
    });
};