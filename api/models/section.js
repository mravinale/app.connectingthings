'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;


var SectionSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: {type: String},
  owner: { type: String, ref: 'User'},
  isPublic: { type: Boolean,  default: true },
  organization: { type: String, ref: 'Organization' }
});

SectionSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Section', SectionSchema);
