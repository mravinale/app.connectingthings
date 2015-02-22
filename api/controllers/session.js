'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    Organization = mongoose.model('Organization'),
    Mailgun = require('mailgun-js');

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-966ab673e0452234ef90349363496a34';

//Your domain, from the Mailgun Control Panel
var domain = 'connectingthings.io';

//Your sending email address
var from_who = 'noreply@connectingthings.io';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});

exports.signUp = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.isValidated = false;
    newUser.admin = true;

    Organization.findOrCreate({name: req.body.organization}, function (error, organization, created) {
        var origin = req.headers.origin;

        if (error) {
            console.log(error);
            res.send(400, error);
        } else {
            newUser.organization = organization;
            newUser.save(function(err) {
                if (err) {
                    return res.json(400, err);
                } else {
                    var data = {
                        from: from_who,
                        to: newUser.email,
                        subject: 'Activate your ConnectingThings account',
                        html: 'Activate your new ConnectingThings account by clicking on the link below. <a href="'+origin+'/#/access/signin?confirmation=' + newUser._id + '">Click here to confirm</a>'
                    };
                    mailgun.messages().send(data, function (err, body) {
                        if (err) {
                            res.json(400, err);
                            console.log("got an error: ", err);
                        }
                        else {
                            res.send(200, newUser);
                            console.log(body);
                        }
                    });
                }
            });
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
        req.logIn(user, function (error) {
            if (error) {
                return res.json(400, error);
            }
            res.json({ '_id': user._id, 'username': user.username, 'email': user.email, 'admin': user.admin, 'organizationName': user.organization.name});
        });
    })(req, res, next);
};