'use strict';
//https://github.com/localytics/angular-chosen
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var SectionSchema = new Schema({
  _id: { type: String },
  name: {type: String},
  tag: {type: String},
  description: {type: String}
});

SectionSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Section', SectionSchema);
