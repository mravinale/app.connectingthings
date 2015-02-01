'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.signUp = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.isValidated = false;
    newUser.admin = true;

    newUser.save(function(err) {
        if (err) {
            return res.json(400, err);
        } else {
            res.send(200, newUser);
        }

    });
};


exports.confirmUser = function (req, res, next) {

    User.findByIdAndUpdate( req.params.userId, {$set: {isValidated: true}}, function (error, user) {
        if (error) {
            console.log(error);
            return res.json(400, error);
        }

        return  res.json(user);

    });
};

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function (req, res) {
    res.json(req.user.user_info);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
    if (req.user) {
        req.logout();
        res.send(200);
    } else {
        res.send(400, "Not logged in");
    }
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info ;

        if (!user.isValidated) {
            return res.json(400, {errors:{email:{type: "Check your email and confirm your registration"}}});
        }
        if (error) {
            return res.json(400, error);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.send(err);
            }
            res.json(req.user.user_info);
        });
    })(req, res, next);
}