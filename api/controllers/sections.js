'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore'),
    async = require('async'),
    Section = mongoose.model('Section'),
    Sensor = mongoose.model('Sensor'),
    Dashboard = mongoose.model('Dashboard')


exports.create = function (req, res, next) {
    var newSection = new Section(req.body);
    newSection.owner = req.user;
    newSection.organization = req.user.organization;

    async.waterfall([

        function(callback) {
            newSection.save(callback)
        },
        function(section, result, callback) {
            Dashboard.findOne({ _id: newSection.dashboard }).lean().exec(callback);
        },
        function(dashboard, callback) {
            delete dashboard._id;
            dashboard.panels.push(newSection._id);
            Dashboard.update({_id: newSection.dashboard}, dashboard,{ runValidators: true }, callback);
        }
    ], function (err, result) {
        if (err) return res.send(400, err);

        return res.send(200, newSection);
    });


};

exports.getAll = function (req, res, next) {

    Section
        .find({owner: req.user})
        .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
        .sort(JSON.parse(req.query.orderBy))
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, devices) {
            Section
              .count({owner: req.user})
              .or([{name: new RegExp(req.query.search, "i")}, {description: new RegExp(req.query.search, "i") }])
              .exec(function (error, count) {
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
        .exec(function (error, sections) {
            if (error) { return res.send(400, error); }
            return  res.send(200, sections);
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

    var sectionToRemove = null;
    async.waterfall([

        function(callback) {
            Section.findOne({ _id: req.params.id }).lean().exec(callback);
        },
        function(section, callback) {
            sectionToRemove = section;
            Section.remove({ _id: req.params.id },callback);
        },
        function(result, callback) {
            Dashboard.findOne({ _id: sectionToRemove.dashboard }).lean().exec(callback);
        },
        function(dashboard, callback) {
            delete dashboard._id;
            dashboard.sections = _.reject(dashboard.sections, function(sectionId){ return sectionToRemove._id == sectionId });
            Dashboard.update({_id: sectionToRemove.dashboard}, dashboard,{ runValidators: true }, callback);
        }
    ], function (err, result) {
        if (err) return res.send(400, err);

        return res.send(200, sectionToRemove);
    });


};

exports.update = function (req, res, next) {

	delete req.body._id;

	Section.update({_id: req.params.id}, req.body, { runValidators: true }, function (error, section) {
		if (error) return res.send(400, error);

		return  res.json(section);
	});


};