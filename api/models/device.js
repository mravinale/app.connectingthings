'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  sensors: [{ type:String, ref: 'Sensor', required: true }],
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization'}
 // url: String,
 // protocol: String
});

DeviceSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});

DeviceSchema.path('sensors').validate(function(sensors){
    if(!sensors) return false;
    return sensors.length !== 0;
}, 'Required at least one element');

mongoose.model('Device', DeviceSchema);
