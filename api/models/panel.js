'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PanelSchema = new Schema({
  _id: { type: String },
  name: String,
  device: { type: String, ref: 'Device' },
  sensor: { type: String, ref: 'Sensor' },
  type: String,
  size: String
});

PanelSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});

mongoose.model('Panel', PanelSchema);