'use strict';
//https://github.com/localytics/angular-chosen
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var SensorSchema = new Schema({
  _id: { type: String },
  name: {type: String, required: true},
  tag: {type: String, required: true},
  description: {type: String},
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
});

SensorSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Sensor', SensorSchema);
