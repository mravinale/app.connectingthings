'use strict';
//https://github.com/localytics/angular-chosen
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  _id: { type: String },
  name: String,
  description: String,
  sensors: [{ type:String, ref: 'Sensor' }],
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
 // url: String,
 // protocol: String
});

DeviceSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Device', DeviceSchema);
