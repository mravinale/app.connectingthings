'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PanelSchema = new Schema({
   _id: {type: String},
  panelName: String,
  deviceType: String
});

PanelSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('User', UserSchema);
