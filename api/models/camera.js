'use strict';
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var CameraSchema = new Schema({
  _id: { type: String },
  name: String,
  description: String,
  owner: { type: String, ref: 'User' },
  login: String,
  password: String,
  url: String,
  organization: { type: String, ref: 'Organization' }
});

CameraSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Camera', CameraSchema);
