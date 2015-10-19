'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var TriggerSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  device: { type: String, ref: 'Device', required: true },
  sensor: { type: String, ref: 'Sensor', required: true },
  rule: { type: String, required: true },
  action: { type: String, required: true },
  value: { type: String, required: true },
  target: { type: String, required: true },
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization'},
  threshold: { type: Number, default: 300, required: true },
  isEnabled: { type: Boolean, default: false }
});

TriggerSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});

mongoose.model('Trigger', TriggerSchema);
