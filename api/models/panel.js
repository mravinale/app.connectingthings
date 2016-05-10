'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PanelSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  device: { type: String, ref: 'Device', default: null },
  camera: { type: String, ref: 'Camera', default: null },
  sensor: { type: String, ref: 'Sensor', default: null },
  type: { type: String, required: true  },
  size: { type: String, required: true  },
  owner: { type: String, ref: 'User'},
  isPublic: { type: Boolean,  default: true },
  organization: { type: String, ref: 'Organization' },
  sizeX: { type: Number, default: 2 },
  sizeY: { type: Number, default: 2 },
  row: { type: Number, default: null },
  col: { type: Number, default: null }

});

PanelSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});


//For update use better the controller
//https://github.com/winstonjs/winston-mongodb
PanelSchema.path('camera').validate(function(camera){
    if(this && this.type === "camera" && !camera) return false;
}, 'Path `camera` is required.');

PanelSchema.path('device').validate(function(device){
    if(this && this.type !== "camera" && !device) return false;
}, 'Path `device` is required.');

PanelSchema.path('sensor').validate(function(sensor){
    if(this && this.type !== "camera" && !sensor) return false;
}, 'Path `sensor` is required.');

mongoose.model('Panel', PanelSchema);