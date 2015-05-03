'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
    crypto = require('crypto');

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.isValidated = false;
 // newUser.organization = req.user.organization._id;
  newUser.key = crypto.randomBytes(8).toString('base64').slice(0,-1);

  newUser.save(function(err) {
    if (err) {
      return res.send(400, err);
    }
      return res.send(newUser.user_info);

    /*req.logIn(newUser, function(err) {
      if (err) return next(err);
      return res.send(newUser.user_info);
    });*/

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

    var query = req.user.organization.name == "admin" && req.user.admin ? {} : {organization: req.user.organization};

    User
        .find( query )
        .sort({name: 'asc'})
        .limit(req.query.count)
        .skip(req.query.count * req.query.page)
        .exec(function (error, users) {
            User.count().exec(function (error, count) {
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
    delete req.body._id;
    User.update({_id: req.params.id}, req.body,{upsert: true}, function (error, user) {
        if (error) {
            console.log(error);
            return res.json(400, error);
        }

        return  res.json(user);

    });
};
