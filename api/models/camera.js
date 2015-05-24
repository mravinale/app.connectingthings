'use strict';
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var CameraSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  login: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String, required: true },
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
});

CameraSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Camera', CameraSchema);
