'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    _ = require('underscore'),
    fs = require('fs'),
    Organization = mongoose.model('Organization'),
    Mailgun = require('mailgun-js'),
    simple_recaptcha = require('simple-recaptcha'),
    path = require('path'),
    crypto = require('crypto');

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-966ab673e0452234ef90349363496a34';

//Your domain, from the Mailgun Control Panel
var domain = 'connectingthings.io';

//Your sending email address
var from_who = 'ConnectingThings <admin@connectingthings.io>';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});

exports.signUp = function (req, res, next) {
    var newUser = new User(req.body);
    var origin = req.headers.referer || req.headers.origin+"/";
    var activatePath = path.join(__dirname, '../templates/ActivateSignupAccount.html');
    newUser.provider = 'local';
    newUser.isValidated = false;
    newUser.admin = true;
    newUser.key = crypto.randomBytes(8).toString('base64').slice(0,-1).replace("/", "X");
    newUser.publicKey = crypto.randomBytes(8).toString('base64').slice(0,-1).replace("/", "X");
    newUser.publicUrl = "#/app/public/dashboard/" +  newUser.publicKey;
    newUser.publicAvatar =  "gravatar/" +  newUser.email;

    var privateKey = '6LctfAITAAAAAKpEYZS-xQKZgiy8xgdnRZyN6jGM',  // your private key here
        ip = req.ip,
        challenge = req.body.captcha ? req.body.captcha.challenge : "",
        response =  req.body.captcha ? req.body.captcha.response : "";

    simple_recaptcha(privateKey, ip, challenge, response, function(err) {
        //{errors:{email:{type: "Check your email and confirm your registration"}}}
        if (err) return res.send(400,{errors:{recaptcha_response_field: {message: err.message}}});

      fs.readFile(activatePath, function (err, html) {
        if (err) {
          return res.send(400, err);
        }

        Organization.findOrCreate({name: "Beta"}, function (error, organization, created) {
            if (error) {
                return res.send(400, error);
            } else {
                newUser.organization = organization;
                newUser.save(function(err) {
                    if (err) {
                        return res.send(400, err);
                    } else {
                        var data = {
                            from: from_who,
                            to: newUser.email,
                            subject: 'Welcome to ConnectingThings.io',
                            html: _.template(html.toString(),{confirmUrl:origin+'#/access/suscription?confirmation=' + newUser._id})
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
      });
    });
};

exports.sendChangePwdEmail = function (req, res, next) {
  var origin = req.headers.referer || req.headers.origin+"/";
  var changePassPath = path.join(__dirname, '../templates/ChangePassword.html');

  User.findOne({email: req.body.email}, function (error, user) {
        if (error) {
          return res.json(400, error);
        }
        if(!user){
          return res.send(200, "Ok");
        }

        User.update({ _id: user._id }, { isPasswordForgot: true }, function(err, result) {
          if (err) {
            return res.send(400, err);
          }

          fs.readFile(changePassPath, function (err, html) {
            if (err) {
              return res.send(400, error);
            }

            var data = {
              from: from_who,
              to: user.email,
              subject: 'Change your ConnectingThings password',
              html: _.template(html.toString(),{passwordChangeUrl:origin+'#/access/changepwd?guid=' + user._id })
            };
            mailgun.messages().send(data, function (err, body) {
              if (err) {
               return res.json(400, err);
              }

              return res.send(200, "Ok");
            });

          });
        });

  });

};

exports.confirmPwd = function (req, res, next) {
  var origin = req.headers.origin;

  User.findById( req.params.guid, function (error, user) {
    if (error) {
      return res.json(400, error);
    }

    if(!user){
      return res.json(400, {errors:{password:{message: "Password not changed, malformed request"}}});
    }

    if(!req.body.password){
      return res.json(400, {errors:{password:{message: "Password required"}}});
    }

    var hashedPassword = user.encryptPassword(req.body.password);
    User.update({ _id: user._id }, { isPasswordForgot: false, hashedPassword: hashedPassword }, function(err, result) {
      if (err) {
        return res.send(400, err);
      }

      return res.send(200, "Ok");

    });

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

exports.getAllUsers = function (req, res, next) {

    User
        .find()
        .lean()
        .exec(function (error, users) {
            if (error) {
                return res.send(400, error);
            }

            return  res.send(200, _.map(users, function(obj) { return _.pick(obj, 'email', 'username', 'publicUrl','statistics','description','publicAvatar'); }));
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

        if (!error && !user.isValidated) {
            return res.json(400, {errors:{email:{type: "Check your email and confirm your registration"}}});
        }
        if (error) {
            return res.json(400, error);
        }
        req.logIn(user, function (error) {
            if (error) {
                return res.json(400, error);
            }
            res.json({
              '_id': user._id,
              'username': user.username,
              'email': user.email,
              'admin': user.admin,
              'organizationName': user.organization.name,
              'organizationId': user.organization._id,
              'key': user.key,
              'showTutorial': user.showTutorial,
              'publicAvatar': "https://avatars.io/"+user.publicAvatar,
              'accountType': user.accountType
            });

        });
    })(req, res, next);
};