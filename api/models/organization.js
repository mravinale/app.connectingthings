'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  _id: { type: String },
  name: {type: String},
    description: {type: String}
});

OrganizationSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Organization', OrganizationSchema);
