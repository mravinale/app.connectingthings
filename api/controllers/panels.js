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
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, panels) {
            Panel.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:panels, count: count});
                }
            });
        });
}

exports.getAllPanels = function (req, res, next) {

    Panel.find()
        .exec(function (error, panels) {
            if (error) {
               console.log(error);
               return res.send(400, error);
            }
            return  res.send(200, panels);
    });
}


exports.getById = function (req, res, next) {

    Panel.findOne({_id: req.params.id})
        .exec(function (error, panel) {
            if (error) {
                console.log(error);
                res.send(400, error);
            } else {
                res.send(200, panel);
            }
        })
};

exports.remove = function (req, res, next) {

    Panel.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
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
    Panel.update({_id: req.params.id}, req.body,{upsert: true}, function (error, panel) {
        if (error) {
           console.log(error);
           return res.json(400, error);
        }

        return  res.json(panel);

    });
};