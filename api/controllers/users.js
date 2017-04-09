'use strict';

var mongoose = require('mongoose'),
    async = require('async'),
    Device = mongoose.model('Device'),
    Panel = mongoose.model('Panel'),
    User = mongoose.model('User'),
    Sensor = mongoose.model('Sensor'),
    Section = mongoose.model('Section'),
    Dashboard = mongoose.model('Dashboard'),
    crypto = require('crypto'),
    Mailgun = require('mailgun-js'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs');


//Your api key, from Mailgunâ€™s Control Panel
var api_key = 'key-966ab673e0452234ef90349363496a34';

//Your domain, from the Mailgun Control Panel
var domain = 'connectingthings.io';

//Your sending email address
var from_who = 'ConnectingThings <admin@connectingthings.io>';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  var origin = req.headers.referer || req.headers.origin+"/";
  var activatePath = path.join(__dirname, '../templates/ActivateInvitationAccount.html');
  newUser.provider = 'local';
  newUser.isValidated = req.body.isValidated;
  newUser.password =  req.body.password;
  newUser.key = crypto.randomBytes(8).toString('base64').slice(0,-1).replace("/", "X");
  newUser.publicKey = crypto.randomBytes(8).toString('base64').slice(0,-1).replace("/", "X");
  newUser.publicUrl =  "#/app/public/dashboard/" +  newUser.publicKey;
  newUser.publicAvatar =  "gravatar/" +  newUser.email;
  var newSensor=null, newDevice=null, newPanel1=null, newPanel2=null, newSection=null, newDashboard=null;


  async.waterfall([
    function (callback) {
      newUser.save(callback);
    },
    function (user, result, callback) {
      fs.readFile(activatePath, callback);
    },
    function (buffer, callback) {
      var data = {
        from: from_who, to: newUser.email, subject: 'Welcome to ConnectingThings.io',
        html: _.template(buffer.toString(),{loginUrl:origin+'#/access/signin', password: newUser.password})
      };

      mailgun.messages().send(data, function (err, body) {
        callback(err, body);
      })
    },
    function (body, callback) {
      newSensor = new Sensor({
        name: "Temperature",
        tag: "temperature",
        description:"Temperature Sensor Demo",
        owner: newUser._id,
        organization: newUser.organization
      });

      newSensor.save( function (err, sensor) {
        callback(err, sensor);
      })
    },
    function (sensor, callback) {
      newDevice = new Device({
        name: "arduino",
        description: "Demo device",
        sensors:[newSensor._id],
        owner: newUser._id,
        organization: newUser.organization
      });

      newDevice.save( function (err, device) {
        callback(err, device);
      })
    },
    function (device, callback) {
      newSection = new Section({
        description: "Temperature Section",
        name: "Temperature Section",
        isPublic: true,
        owner: newUser._id,
        col: 0,
        row: 0,
        organization: newUser.organization
      });

      newSection.save( function (err, section) {
        callback(err, section);
      })
    },
    function (section, callback) {
      newPanel1 = new Panel({
        type: "gauge",
        name: "Temperature Gauge",
        device: newDevice._id,
        sensor: newSensor._id,
        size: "small",
        col: 0,
        row: 1,
        isPublic: true,
        owner: newUser._id,
        organization: newUser.organization
      });

      newPanel1.save( function (err, result) {
        callback(err, result);
      })
    },
    function (section, callback) {
      newPanel2 = new Panel({
        type: "d3-chart",
        name: "Temperature Chart",
        device: newDevice._id,
        sensor: newSensor._id,
        size: "small",
        col: 2,
        row: 1,
        sizeX: 4,
        isPublic: true,
        owner: newUser._id,
        organization: newUser.organization
      });

      newPanel2.save( function (err, result) {
        callback(err, result);
      })
    },
    function (panel, callback) {
      newDashboard = new Dashboard({
        description: "Demo Dashboard",
        name: "Demo",
        sections: [newSection._id],
        panels: [newPanel1._id, newPanel2._id],
        isPublic: true,
        owner: newUser._id,
        organization: newUser.organization
      });

      newDashboard.save( function (err, result) {
        callback(err, result);
      })
    },
    function (dashboard, callback) {
      Section.update({_id: newSection._id}, { $set: { dashboard: newDashboard._id  } },{ runValidators: true }, callback);
    },
    function (result, callback) {
      Panel.update({_id: newPanel1._id}, { $set: { dashboard:  newDashboard._id } },{ runValidators: true }, callback);
    },
    function (result, callback) {
      Panel.update({_id: newPanel2._id}, { $set: { dashboard:  newDashboard._id } },{ runValidators: true }, callback);
    }
  ], function (err, result) {
    if (err) return res.send(400, err);

    return res.send(200, newUser);
  });

};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function (req, res, next) {
  var userId = req.params.userId;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({username: user.username, profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};


/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
  var username = req.params.username;
  User.findOne({ username : username }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if(user) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
};

exports.getAll = function (req, res, next) {

  // var query = req.user.organization.name == "admin" && req.user.admin ? {} : {organization: req.user.organization};

  User
    .find()
    .or([ { username: new RegExp(req.query.search, "i") }, { email: new RegExp(req.query.search, "i") } ])
    .sort(JSON.parse(req.query.orderBy))
    .limit(req.query.count)
    .skip(req.query.count * req.query.page)
    .exec(function (error, users) {
      User
        .count()
        .or([ { username: new RegExp(req.query.search, "i") }, { email: new RegExp(req.query.search, "i") } ])
        .exec(function (error, count) {
          if (error) {
            console.log(error);
            res.send(400, error);
          } else {
            res.send(200, {data: users, count: count});
          }
        });
    });
};

exports.getAllUsers = function (req, res, next) {
  var query = req.user.organization.name == "admin" && req.user.admin ? {} : {organization: req.user.organization};

  User
    .find(query)
    .exec(function (error, users) {
      if (error) {
        console.log(error);
        return res.send(400, error);
      }
      return  res.send(200, users);

    });
};

exports.getById = function (req, res, next) {
  User
    .findOne({_id: req.params.id})
    .exec(function (error, user) {
      if (error) {
        console.log(error);
        res.send(400, error);
      } else {
        res.send(200, user);
      }
    })
};

exports.remove = function (req, res, next) {

  User.remove({ _id: req.params.id }, function (error) {
    if (error) {
      log.error(error);
      res.send(400, error);
    } else {
      res.send(200);
    }
  });
};

exports.update = function (req, res, next) {

  User.findById( req.params.id, function (err, user) {
    delete req.body._id;
    delete req.body.email;

    if(user.username === req.body.username)
      delete req.body.username;

    if(req.body.password) {
      req.body.hashedPassword = user.encryptPassword(req.body.password);
    }

    User.update({_id: req.params.id}, req.body, { runValidators: true },function (error, panel) {
      if (error) return res.json(400, error);

      return  res.json(panel);
    });

  });

};
