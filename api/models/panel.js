'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PanelSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  device: { type: String, ref: 'Device' },
  camera: { type: String, ref: 'Camera' },
  sensor: { type: String, ref: 'Sensor' },
  type: { type: String, required: true  },
  size: { type: String, required: true  },
  owner: { type: String, ref: 'User'},
  organization: { type: String, ref: 'Organization' }
});

PanelSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});


PanelSchema.path('camera').validate(function(camera){
     if(this.type === "camera" && !camera) return false;
}, 'Path `camera` is required.');

PanelSchema.path('device').validate(function(device){
     if(this.type === "camera" && !device) return true;
}, 'Path `device` is required.');

PanelSchema.path('sensor').validate(function(sensor){
     if(this.type === "camera" && !sensor) return true;
}, 'Path `sensor` is required.');

mongoose.model('Panel', PanelSchema);