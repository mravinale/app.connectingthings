'use strict';

var mongoose = require('mongoose'),
    Panel = mongoose.model('Panel'),
    mqtt = require('mqtt'),
    mqttClient = mqtt.createClient(1883, 'localhost'),
    Client = require('node-rest-client').Client;

var client = new Client();


exports.create = function (req, res, next) {
    var newPanel = new Panel(req.body);
    newPanel.owner = req.user;
    newPanel.organization = req.user.organization;

    newPanel.save(function(err, panel) {
        if (err) {
          return res.send(400, err);
        }

        return res.send(200, panel);
    });
};


exports.getAll = function (req, res, next) {

    Panel
        .find({owner: req.user})
        //.find({organization: req.user.organization})
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .populate('sensor')
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

    Panel
        .find({owner: req.user})
        //.find({organization: req.user.organization})
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
        if (error) return res.send(400, error);

        res.send(200);
    });

};

exports.update = function (req, res, next) {
    delete req.body._id;

    Panel.update({_id: req.params.id}, req.body,{upsert: true, runValidators: true }, function (error, panel) {
        if (error) {
           return res.json(400, error);
        }

        return  res.json(panel);

    });
};

exports.command = function (req, res, next) {

    /*
    if(req.body.protocol == "http") {

        client.get(req.body.url + "?" + req.body.tag + "=" + req.body.message.value, function (data, response) {
            mqttClient.publish(req.body.topic, JSON.stringify(req.body.message));
            return res.send(200, "ok");
        });

    }
    */

   // if(req.body.protocol == "mqtt"){

        mqttClient.publish(req.body.topic, JSON.stringify(req.body.message), {retain: true});
        return res.json({result: "ok"});

 //   }
};

