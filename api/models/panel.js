'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PanelSchema = new Schema({
  _id: { type: String },
  name: String,
  device: { type: String, ref: 'Device' },
  camera: { type: String, ref: 'Camera' },
  sensor: { type: String, ref: 'Sensor' },
  type: String,
  size: String,
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
});

PanelSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});

mongoose.model('Panel', PanelSchema);