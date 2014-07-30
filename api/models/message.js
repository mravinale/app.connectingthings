'use strict';
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  _id: { type: String },
  tag: {type: String},
  message: {type: String},
  date:{type: Number}
});

MessageSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Message', MessageSchema);
