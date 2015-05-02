'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('node-uuid'),
  crypto = require('crypto');

var UserSchema = new Schema({
  _id: { type: String },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  hashedPassword: String,
  salt: String,
  name: String,
  admin: Boolean,
  guest: Boolean,
  provider: String,
  isValidated: Boolean,
  organization: { type: String, ref: 'Organization', unique: true, required: true},
  key: String
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
    return { '_id': this._id, 'username': this.username, 'email': this.email, 'admin': this.admin, 'organizationName': this.organization.name, 'key': this.key};
  });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

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
    return this.encryptPassword(plainText) === this.hashedPassword;
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
