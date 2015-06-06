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
  hashedPassword: String,
  salt: String,
  surname: String,
  admin: Boolean,
  guest: Boolean,
  provider: String,
  isValidated: Boolean,
	disabled: {type: Boolean, default: false},
  organization: { type: String, ref: 'Organization', required: true},
  key: String,
  publicKey: String,
  publicUrl: String,
  statistics:{
    cameras: { type: Number, default: 0 },
    dashboards: { type: Number, default: 0 },
    devices: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    sensors: { type: Number, default: 0 },
    panels: { type: Number, default: 0 }
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
    return { '_id': this._id, 'username': this.username, 'email': this.email, 'admin': this.admin, 'organizationName': this.organization.name, 'organizationId': this.organization._id, 'key': this.key};
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
   * Authenticate - check if the passwords are the same
   */

  authenticate: function(plainText) {
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
