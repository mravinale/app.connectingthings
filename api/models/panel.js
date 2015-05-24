'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PanelSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  device: { type: String, ref: 'Device', required: true },
  camera: { type: String, ref: 'Camera', required: true  },
  sensor: { type: String, ref: 'Sensor', required: true  },
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

mongoose.model('Panel', PanelSchema);