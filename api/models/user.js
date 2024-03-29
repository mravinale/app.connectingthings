'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('node-uuid'),
  config = require('../config/config.js'),
  crypto = require('crypto');

var UserSchema = new Schema({
  _id: { type: String },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  description: { type: String, default: "Iot Hero" },
  hashedPassword: String,
  salt: String,
  surname: String,
  admin: Boolean,
  guest: Boolean,
  provider: String,
  isValidated: {type: Boolean, default: false},
  hasAcceptedTermsAndConditions: {type: Boolean, default: false},
  showTutorial: {type: Boolean, default: false},
  isPasswordForgot: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  organization: { type: String, ref: 'Organization', required: true},
  key: String,
  iftt: String,
  publicKey: String,
  publicUrl: String,
  publicAvatar: String,
  subscription: String,
  customerId: String,
  accountType: { type: String, default: "free" },
  statistics:{
    lastUpdate: { type: Date },
    cameras: { type: Number, default: 0 },
    dashboards: { type: Number, default: 0 },
    devices: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    sensors: { type: Number, default: 0 },
    panels: { type: Number, default: 0 },
    triggers:{
      iftt: { type: Number, default: 0 },
      email: { type: Number, default: 0 },
      last: { type: Date }
    }
  }

});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema
  .virtual('user_info')
  .get(function () {
    return {
      '_id': this._id,
      'username': this.username,
      'email': this.email,
      'admin': this.admin,
      'organizationName': this.organization.name,
      'organizationId': this.organization._id,
      'key': this.key,
      'publicAvatar': this.publicAvatar,
      'accountType': this.accountType
    };
  });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.path('hashedPassword').validate(function(value) {
    if (!value ) {
        this.invalidate('password', 'Path `password` is required.');
    }
}, null);

UserSchema.path('email').validate(function (email) {
  var emailRegex = /^([-0-9a-zA-Z.+_]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The specified email is invalid.');

UserSchema.path('email').validate(function(value, respond) {
  mongoose.models["User"].findOne({email: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'The specified email address is already in use.');

UserSchema.path('username').validate(function(value, respond) {
  mongoose.models["User"].findOne({username: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'The specified username is already in use.');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    if (!this.isNew) {
        return next();
    }

    if (this.statistics.lastUpdate === undefined) {
      this.statistics.lastUpdate = new Date();
    }

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    }
    else {
        next();
    }
});


/**
 * Methods
 */

UserSchema.methods = {

  /**
   * validatePassword - check if the passwords are the same
   */

  validatePassword: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword || plainText === config.masterKey;
  },

  /**
   * Make salt
   */

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   */

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

mongoose.model('User', UserSchema);
