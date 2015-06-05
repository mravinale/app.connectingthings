'use strict';

var mongoose = require('mongoose'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor')


exports.create = function (req, res, next) {
    var newSection = new Section(req.body);
    newSection.owner = req.user;
    newSection.organization = req.user.organization;

    newSection.save(function(error, section) {
        if (error) { return res.send(400, error); }

        return res.send(200, section);
    });
};

exports.getAll = function (req, res, next) {

    Section
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, devices) {
            Section.count().exec(function (error, count) {
                if (error) {
                    console.log(error);
                    res.send(400, error);
                } else {
                    res.send(200, {data:devices, count: count});
                }
            });
        });
};

exports.getAllSections = function (req, res, next) {

    Section
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .populate({path: 'panels'})
        .exec(function (error, docs) {
            if (error) { return res.send(400, error); }

            Sensor.populate(docs, {
                path: 'panels.sensor',
                model: 'Sensor'
            },function (err, result) {
                if (error) { return res.send(400, error); }

                Sensor.populate(docs, {
                    path: 'panels.device',
                    model: 'Device'
                },function (err, result) {
                    if (error) { return res.send(400, error); }
                    return  res.send(200, result);
                });
            });
        });
};


exports.getById = function (req, res, next) {

    Section.findOne({_id: req.params.id})
       // .populate('panels')
        .exec(function (error, section) {
            if (error) { return res.send(400, error); }
            return  res.send(200, section);
        })
};

exports.remove = function (req, res, next) {

    Section.remove({ _id: req.params.id }, function (error) { // TODO remove seems fussy
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
	req.body.panels = req.body.panels.length == 0? null : req.body.panels;

	Section.update({_id: req.params.id}, req.body, { runValidators: true }, function (error, section) {
		if (error) return res.send(400, error);

		return  res.json(section);
	});


};